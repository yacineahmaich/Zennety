<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Organization;
use App\Models\User;

class OrganizationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Organization $organization): bool
    {
        if (! $member = $user->memberFor($organization)) {
            return false;
        }

        return $member->checkPermissionTo('view');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Organization $organization): bool
    {
        if (! $member = $user->memberFor($organization)) {
            return false;
        }

        return $member->checkPermissionTo('update');
    }

    public function delete(User $user, Organization $organization): bool
    {
        if (! $member = $user->memberFor($organization)) {
            return false;
        }

        return $member->checkPermissionTo('delete');
    }

    /**
     * User may create a workspace inside this organization (Owner or Admin).
     */
    public function createWorkspace(User $user, Organization $organization): bool
    {
        if (! $member = $user->memberFor($organization)) {
            return false;
        }

        return $member->hasAnyRole([Role::OWNER, Role::ADMIN]);
    }
}
