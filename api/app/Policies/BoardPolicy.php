<?php

namespace App\Policies;

use App\Enums\Visibility;
use App\Models\Board;
use App\Models\User;
use App\Models\Workspace;

class BoardPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Board $board): bool
    {
        // user can see board if its public and he is a member of workspace
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

        return $member->checkPermissionTo('create');
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
}
