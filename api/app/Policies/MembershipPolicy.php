<?php

namespace App\Policies;

use App\Models\Membership;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class MembershipPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Model $membershipable): bool
    {
        if (!$member = $user->memberFor($membershipable)) {
            return false;
        }

        return $member->checkPermissionTo("view");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Membership $membership): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Membership $membership): bool
    {
        if (!$member = $user->memberFor($membership->membershipable)) {
            return false;
        }

        return $member->checkPermissionTo("update");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Membership $membership): bool
    {
        if (!$member = $user->memberFor($membership->membershipable)) {
            return false;
        }

        return $member->checkPermissionTo("delete");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Membership $membership): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Membership $membership): bool
    {
        //
    }
}
