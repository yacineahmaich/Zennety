<?php

namespace App\Policies;

use App\Enums\Role;
use App\Enums\Visibility;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;

class WorkspacePolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Workspace $workspace): bool
    {
        if ($workspace->visibility == Visibility::PUBLIC) {
            return true;
        }

        // user can see workspace if he is a member of one of its board
        foreach($workspace->boards as $board) {
            if($user->memberFor($board)) {
                return true;
            }
        }

        if (!$member = $user->memberFor($workspace)) {
            return false;
        }

        return $member->checkPermissionTo('view');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Workspace $workspace): bool
    {
        if (!$member = $user->memberFor($workspace)) {
            return false;
        }
        return $member->checkPermissionTo('update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Workspace $workspace): bool
    {
        if (!$member = $user->memberFor($workspace)) {
            return false;
        }
        return $member->checkPermissionTo('delete');
    }

    /**
     * Determine whether the user can tranfer workspace ownership
     */
    public function transferOwnership(User $user, Workspace $workspace, Membership $membership): bool
    {
        if (!$member = $user->memberFor($workspace)) {
            return false;
        }

        if(!$membership->hasRole(Role::ADMIN)) {
            return false;
        }

        return $member->hasRole(Role::OWNER);
    }
}
