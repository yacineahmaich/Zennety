<?php

namespace App\Policies;

use App\Enums\Visibility;
use App\Models\Board;
use App\Models\User;
use App\Models\Workspace;

class BoardPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Board $board): bool
    {
        if ($board->visibility == Visibility::PUBLIC) {
            if ($user->memberFor($board->workspace)) {
                return true;
            }
        }

        if (!$member = $user->memberFor($board)) {
            return false;
        }

        return $member->checkPermissionTo('view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Workspace $workspace): bool
    {
        if (!$member = $user->memberFor($workspace)) {
            return false;
        }

        // if user can update workspace then he can create a board
        return $member->checkPermissionTo('update');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Board $board): bool
    {
        if (!$member = $user->memberFor($board)) {
            return false;
        }

        return $member->checkPermissionTo('update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Board $board): bool
    {
        if (!$member = $user->memberFor($board)) {
            return false;
        }

        return $member->checkPermissionTo('delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Board $board): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Board $board): bool
    {
        //
    }
}
