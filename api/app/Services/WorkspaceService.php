<?php


namespace App\Services;

use App\DTO\WorkspaceDTO;
use App\Enums\Role;
use App\Enums\Visibility;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class WorkspaceService
{
    public function getMyWorkspaces(User $user): Collection
    {
        // TODO: Group query by owned workspaces and guest workspaces (currently done in frontend)
        return Workspace::with(['members', 'boards'])
            ->whereHas('members', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            // TODO: include workspaces where user is member of one of its boards
//            ->orWhereHas('boards', function ($query) use ($user) {
//                $query->whereHas('members',function ($query) use ($user) {
//                        $query->where('user_id', $user->id);
//                    });
//            })
            ->get();
    }

    public function createWorkspace(WorkspaceDTO $workspaceDTO, User $user): Workspace
    {
        return DB::transaction(function () use ($workspaceDTO, $user) {
            /**@var Workspace $workspace */
            $workspace = Workspace::create($workspaceDTO->toArray());

            /**@var Membership $owner */
            $owner = $workspace->members()->create([
                "user_id" => $user->id
            ]);

            $owner->assignRole(Role::OWNER);

            return $workspace;
        });
    }

    public function updateWorkspace(Workspace $workspace, WorkspaceDTO $workspaceDTO): Workspace
    {
        return tap($workspace)->update($workspaceDTO->toArray());
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

    public function updateWorkspaceAvatar(Workspace $workspace, $avatar): void
    {
        if($avatar === "unset") {
            $workspace->getFirstMedia('avatar')?->delete();
        }elseif(is_uploaded_file($avatar)) {
            $workspace->addMedia($avatar)
                ->toMediaCollection('avatar');
        }
    }
}
