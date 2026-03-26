<?php

namespace App\Policies;

use App\Enums\Role;
use App\Models\Membership;
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

    /**
     * Transfer organization ownership to an admin member.
     */
    public function transferOwnership(User $user, Organization $organization, Membership $membership): bool
    {
        if ($membership->membershipable_type !== Organization::class
            || $membership->membershipable_id !== $organization->id) {
            return false;
        }

        if (! $member = $user->memberFor($organization)) {
            return false;
        }

        if (! $membership->hasRole(Role::ADMIN)) {
            return false;
        }

        return $member->hasRole(Role::OWNER);
    }
}
