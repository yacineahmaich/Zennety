<?php

namespace Database\Seeders;

use App\Enums\Priority;
use App\Enums\Role;
use App\Enums\Visibility;
use App\Models\Board;
use App\Models\Card;
use App\Models\Organization;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    private const FIXTURE_RELATIVE = 'demo/demo-data.json';

    private const YACINE_EMAIL = 'yacine@zennety.app';

    public function run(): void
    {
        $path = database_path(self::FIXTURE_RELATIVE);
        if (! File::exists($path)) {
            throw new \RuntimeException("Missing demo fixture: {$path}");
        }

        $data = json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);
        if (! isset($data['users'], $data['organizations']) || ! is_array($data['users']) || ! is_array($data['organizations'])) {
            throw new \RuntimeException('Invalid demo-data.json: expected users and organizations arrays.');
        }

        $password = env('DEMO_USERS_PASSWORD', 'Demo123@');

        DB::transaction(function () use ($data, $password) {
            $usersByEmail = $this->seedUsers($data['users'], $password);
            $yacine = $usersByEmail->get(self::YACINE_EMAIL);
            if (! $yacine) {
                throw new \RuntimeException('Fixture must include '.self::YACINE_EMAIL);
            }
            $nonYacine = $usersByEmail->except([self::YACINE_EMAIL])->values();

            Auth::login($yacine);

            $orgIndex = 0;
            $boardGlobal = 0;

            foreach ($data['organizations'] as $orgData) {
                $isPersonal = (bool) ($orgData['personal'] ?? false);

                $org = Organization::create([
                    'name' => $orgData['name'],
                    'description' => $orgData['description'] ?? null,
                ]);

                if ($isPersonal) {
                    $ownerEmail = $orgData['ownerEmail'] ?? null;
                    $owner = $ownerEmail ? $usersByEmail->get($ownerEmail) : null;
                    if (! $owner) {
                        throw new \RuntimeException('Personal organization missing valid ownerEmail: '.$orgData['name']);
                    }
                    $this->attachSingleOwner($org, $owner);
                } else {
                    $yacineOrgRole = $orgData['yacineOrganizationRole'] ?? null;
                    if ($yacineOrgRole === null || ! in_array($yacineOrgRole, Role::values(), true)) {
                        throw new \RuntimeException('Shared organization missing valid yacineOrganizationRole: '.($orgData['name'] ?? ''));
                    }
                    $this->attachMemberships(
                        $org,
                        $yacine,
                        $nonYacine,
                        $orgData['name'],
                        $orgIndex,
                        $yacineOrgRole
                    );
                }

                foreach ($orgData['workspaces'] ?? [] as $wsData) {
                    $workspace = Workspace::create([
                        'name' => $wsData['name'],
                        'description' => $wsData['description'] ?? null,
                        'visibility' => $this->mapVisibility($wsData['visibility'] ?? Visibility::PUBLIC),
                        'organization_id' => $org->id,
                    ]);

                    $workspaceMembers = $wsData['members'] ?? null;
                    if (! is_array($workspaceMembers) || $workspaceMembers === []) {
                        throw new \RuntimeException('Workspace missing members array: '.($wsData['name'] ?? '').' in '.($orgData['name'] ?? ''));
                    }
                    $this->applyMembersFromFixture($workspace, $workspaceMembers, $usersByEmail);

                    foreach ($wsData['boards'] ?? [] as $boardData) {
                        $board = Board::create([
                            'name' => $boardData['name'],
                            'description' => $boardData['description'] ?? null,
                            'visibility' => $this->mapVisibility($boardData['visibility'] ?? Visibility::PUBLIC),
                            'workspace_id' => $workspace->id,
                        ]);

                        $this->applyMembersFromFixture($board, $workspaceMembers, $usersByEmail);

                        $this->seedDefaultStatuses($board);
                        $this->seedCards($board, $boardData['cards'] ?? [], $usersByEmail);

                        $boardGlobal++;
                    }
                }
                if (! $isPersonal) {
                    $orgIndex++;
                }
            }

            $this->applyBoardBookmarks($data['users'], $usersByEmail);
        });
    }

    /**
     * @param  array<int, array<string, mixed>>  $rows
     */
    private function seedUsers(array $rows, string $password): Collection
    {
        $byEmail = collect();
        foreach ($rows as $row) {
            $attrs = Arr::only($row, ['name', 'email', 'bio']);
            $user = User::create([
                ...$attrs,
                'password' => Hash::make($password),
                'pins' => [],
            ]);
            $byEmail->put($user->email, $user);
        }

        return $byEmail;
    }

    private function attachSingleOwner(Organization|Workspace|Board $resource, User $owner): void
    {
        $membership = $resource->members()->create(['user_id' => $owner->id]);
        $membership->assignRole(Role::OWNER);
    }

    /**
     * @param  array<int, array<string, mixed>>  $userRows
     */
    private function applyBoardBookmarks(array $userRows, Collection $usersByEmail): void
    {
        foreach ($userRows as $row) {
            $bookmarks = $row['bookmarks'] ?? null;
            if (! is_array($bookmarks) || $bookmarks === []) {
                continue;
            }
            $user = $usersByEmail->get($row['email'] ?? '');
            if (! $user) {
                continue;
            }
            $pins = [];
            foreach ($bookmarks as $triple) {
                if (! is_array($triple) || count($triple) < 3) {
                    continue;
                }
                [$orgName, $wsName, $boardName] = [$triple[0], $triple[1], $triple[2]];
                if (! is_string($orgName) || ! is_string($wsName) || ! is_string($boardName)) {
                    continue;
                }
                $board = Board::query()
                    ->where('name', $boardName)
                    ->whereHas('workspace', function ($q) use ($wsName, $orgName) {
                        $q->where('name', $wsName)
                            ->whereHas('organization', fn ($q2) => $q2->where('name', $orgName));
                    })
                    ->first();
                if ($board) {
                    $pins['board_'.$board->id] = ['type' => 'board', 'id' => $board->id];
                }
            }
            if ($pins !== []) {
                $user->update(['pins' => $pins]);
            }
        }
    }

    /**
     * @param  list<array{email: string, role: string}>  $members
     */
    private function applyMembersFromFixture(Workspace|Board $resource, array $members, Collection $usersByEmail): void
    {
        foreach ($members as $entry) {
            if (! isset($entry['email'], $entry['role']) || ! is_string($entry['email']) || ! is_string($entry['role'])) {
                throw new \RuntimeException('Invalid workspace member entry in demo-data.json');
            }
            if (! in_array($entry['role'], Role::values(), true)) {
                throw new \RuntimeException('Invalid role in fixture: '.$entry['role']);
            }
            $user = $usersByEmail->get($entry['email']);
            if (! $user) {
                throw new \RuntimeException('Unknown member email in fixture: '.$entry['email']);
            }
            $membership = $resource->members()->create(['user_id' => $user->id]);
            $membership->assignRole($entry['role']);
        }
    }

    private function attachMemberships(
        Organization|Workspace|Board $resource,
        User $yacine,
        Collection $nonYacine,
        string $key,
        int $ownerRotationIndex,
        string $yacineRole
    ): void {
        if ($nonYacine->isEmpty()) {
            throw new \RuntimeException('Need at least one non-Yacine user in the fixture.');
        }

        $h = crc32($key);
        $targetSize = 3 + ($h % 4);
        $deputy = $nonYacine[$ownerRotationIndex % $nonYacine->count()];

        $ids = collect([$yacine->id, $deputy->id]);
        $pool = $nonYacine->pluck('id')->all();
        $start = $h % count($pool);
        $guard = 0;
        while ($ids->unique()->count() < $targetSize && $guard < 64) {
            $id = $pool[$start % count($pool)];
            if (! $ids->contains($id)) {
                $ids->push($id);
            }
            $start++;
            $guard++;
        }
        $ids = $ids->unique()->values();

        foreach ($ids as $userId) {
            $membership = $resource->members()->create(['user_id' => $userId]);
            if ($userId === $yacine->id) {
                $membership->assignRole($yacineRole);
            } elseif ($userId === $deputy->id) {
                $membership->assignRole($yacineRole === Role::OWNER ? Role::ADMIN : Role::OWNER);
            } else {
                $membership->assignRole(Role::MEMBER);
            }
        }
    }

    private function seedDefaultStatuses(Board $board): void
    {
        $board->statuses()->createMany([
            ['pos' => 1, 'name' => 'Pending'],
            ['pos' => 2, 'name' => 'In progress'],
            ['pos' => 3, 'name' => 'In Review'],
            ['pos' => 4, 'name' => 'Blocked'],
            ['pos' => 5, 'name' => 'Done'],
        ]);
    }

    /**
     * @param  array<int, array{status: string, title?: string, name?: string, assigneeEmail?: string|null, priority?: string|null, description?: string|null, deadline?: string|null}>  $cards
     */
    private function seedCards(Board $board, array $cards, Collection $usersByEmail): void
    {
        $statusByName = $board->statuses()->get()->keyBy('name');
        $nextPos = [];
        $allUsers = $usersByEmail->values();
        $fallbackIndex = 0;
        $previousUser = Auth::user();

        foreach ($cards as $cardRow) {
            $statusName = $cardRow['status'] ?? 'Pending';
            $status = $statusByName->get($statusName) ?? $statusByName->first();
            $sid = $status->id;
            $nextPos[$sid] = ($nextPos[$sid] ?? 0) + 1;

            $title = $cardRow['title'] ?? $cardRow['name'] ?? 'Untitled card';
            $assigneeEmail = $cardRow['assigneeEmail'] ?? null;
            $assignee = $assigneeEmail ? $usersByEmail->get($assigneeEmail) : null;

            $priority = $cardRow['priority'] ?? null;
            if ($priority !== null && ! in_array($priority, Priority::values(), true)) {
                $priority = Priority::NORMAL;
            }

            $actor = $assignee ?? $allUsers[$fallbackIndex % $allUsers->count()];
            $fallbackIndex++;
            Auth::login($actor);

            Card::create([
                'name' => $title,
                'description' => $cardRow['description'] ?? null,
                'pos' => $nextPos[$sid],
                'priority' => $priority,
                'deadline' => isset($cardRow['deadline']) ? $cardRow['deadline'] : null,
                'status_id' => $sid,
                'user_id' => $assignee?->id,
            ]);
        }

        if ($previousUser) {
            Auth::login($previousUser);
        }
    }

    private function mapVisibility(string $value): string
    {
        return match ($value) {
            Visibility::PUBLIC, 'Public' => Visibility::PUBLIC,
            Visibility::PRIVATE, 'Private' => Visibility::PRIVATE,
            default => Visibility::PUBLIC,
        };
    }
}
