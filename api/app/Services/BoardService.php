<?php


namespace App\Services;

use App\DTO\BoardDTO;
use App\Enums\Role;
use App\Models\Board;
use App\Models\Membership;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Support\Facades\DB;

class BoardService
{
    public function createBoard(Workspace $workspace, User $user, BoardDTO $boardDTO): Board
    {
        return DB::transaction(function () use ($workspace, $user, $boardDTO) {
            /**@var Board $board */
            $board = $workspace->boards()->create($boardDTO->toArray());

            /**@var Membership $owner */
            $owner = $board->members()->create([
                "user_id" => $user->id
            ]);

            $owner->assignRole(Role::OWNER);

            // Init board with default statuses
            $board->statuses()->createMany([
                [
                    "position" => 1,
                    "name" => "Pending",
                ],
                [
                    "position" => 2,
                    "name" => "In progress",
                ],
                [
                    "position" => 3,
                    "name" => "Done",
                ],
            ]);

            return $board;
        });
    }

    public function updateBoard(Board $board, BoardDTO $boardDTO): Board
    {
        return tap($board)->update($boardDTO->toArray());
    }

    public function deleteBoard(Board $board): void
    {
        $board->delete();
    }

}
