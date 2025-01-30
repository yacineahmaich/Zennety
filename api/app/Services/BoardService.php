<?php


namespace App\Services;

use App\Enums\Role;
use App\Models\Board;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\DB;

class BoardService
{
    public function createBoard(Workspace $workspace, User $user, array $data): Board
    {
        return DB::transaction(function () use ($workspace, $user, $data) {
            /**@var Board $board */
            $board = $workspace->boards()->create($data);

            /**@var Membership $owner */
            $owner = $board->members()->create([
                "user_id" => $user->id
            ]);

            $owner->assignRole(Role::OWNER);

            return $board;
        });
    }

    public function updateBoard(Board $board, array $data): Board
    {
        return tap($board)->update($data);
    }

    public function deleteBoard(Board $board): void
    {
        $board->delete();
    }

}
