<?php


namespace App\Services;

use App\DTO\WorkspaceDTO;
use App\Enums\Role;
use App\Enums\Visibility;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\DB;

class WorkspaceService
{
    public function getMyWorkspaces(User $user)
    {
        // TODO: Group query by owned workspaces and guest workspaces (currently done in frontend)
        // TODO: include workspaces in whish user is a member of its boards
        return Workspace::with('members')
            ->whereHas('members', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->with('boards', function ($query) use ($user) {
                $query->whereHas('members', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                    ->orWhere('visibility', Visibility::PUBLIC)
                    ->with('members');
            })
            ->get();
    }

    public function createWorkspace(array $data, User $user): Workspace
    {
        return DB::transaction(function () use ($data, $user) {
            /**@var Workspace $workspace */
            $workspace = Workspace::create($data);

            /**@var Membership $owner */
            $owner = $workspace->members()->create([
                "user_id" => $user->id
            ]);

            $owner->assignRole(Role::OWNER);

            return $workspace;
        });
    }

    public function updateWorkspace(Workspace $workspace, array $data): Workspace
    {
        return tap($workspace)->update($data);
    }

    public function deleteWorkspace(Workspace $workspace): void
    {
        $workspace->delete();
    }

    public function tranferOwnership(Workspace $workspace, User $user, Membership $member): void
    {
        DB::transaction(function () use ($workspace, $member, $user) {
            $currentOwnerMembership = $user->memberFor($workspace);

            $currentOwnerMembership->syncRoles([Role::ADMIN]);

            $member->syncRoles([Role::OWNER]);
        });
    }
}
