<?php

namespace App\Policies;

use App\Enums\Role;
use App\Enums\Visibility;
use App\Models\Membership;
use App\Models\Organization;
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

        if ($workspace->organization_id) {
            $organization = $workspace->relationLoaded('organization')
                ? $workspace->organization
                : Organization::find($workspace->organization_id);
            if ($organization && ($m = $user->memberFor($organization)) && $m->checkPermissionTo('view')) {
                return true;
            }
        }

        // user can see workspace if he is a member of one of its board
        foreach ($workspace->boards as $board) {
            if ($user->memberFor($board)) {
                return true;
            }
        }

        if (! $member = $user->memberFor($workspace)) {
            return false;
        }

        return $member->checkPermissionTo('view');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Workspace $workspace): bool
    {
        if ($member = $user->memberFor($workspace)) {
            return $member->checkPermissionTo('update');
        }

        if ($workspace->organization_id) {
            $organization = $workspace->relationLoaded('organization')
                ? $workspace->organization
                : Organization::find($workspace->organization_id);
            if ($organization && ($m = $user->memberFor($organization)) && $m->hasAnyRole([Role::OWNER, Role::ADMIN])) {
                return $m->checkPermissionTo('update');
            }
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Workspace $workspace): bool
    {
        if ($member = $user->memberFor($workspace)) {
            return $member->checkPermissionTo('delete');
        }

        if ($workspace->organization_id) {
            $organization = $workspace->relationLoaded('organization')
                ? $workspace->organization
                : Organization::find($workspace->organization_id);
            if ($organization && ($m = $user->memberFor($organization)) && $m->hasRole(Role::OWNER)) {
                return $m->checkPermissionTo('delete');
            }
        }

        return false;
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
