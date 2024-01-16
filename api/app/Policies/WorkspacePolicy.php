<?php

namespace App\Policies;

use App\Enums\Visibility;
use App\Models\User;
use App\Models\Workspace;

class WorkspacePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Workspace $workspace): bool
    {
        if ($workspace->visibility == Visibility::PUBLIC) {
            return true;
        }

        if (!$member = $user->memberFor($workspace)) {
            return false;
        }

        return $member->checkPermissionTo('view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
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
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Workspace $workspace): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Workspace $workspace): bool
    {
        return true;
    }
}
