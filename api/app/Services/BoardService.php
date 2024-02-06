<?php


namespace App\Services;

use App\DTO\BoardDTO;
use App\Enums\Role;
use App\Models\Board;
use App\Models\Workspace;
use Illuminate\Support\Facades\DB;

class BoardService
{
    public function store(BoardDTO $boardDTO, Workspace $workspace): Board
    {
        $board = DB::transaction(function () use ($workspace, $boardDTO) {
            $board = $workspace->boards()->create([
                'name' => $boardDTO->name,
                'description' => $boardDTO->description,
                'visibility' => $boardDTO->visibility,
            ]);

            /**@var App\Models\Membership $owner */
            $owner = $board->members()->create([
                "user_id" => auth()->id()
            ]);

            // Create some default statuses
            $board->statuses()->createMany([
                ["name" => "Pending"],
                ["name" => "In Progress"],
                ["name" => "Done"],
            ]);

            $owner->assignRole(Role::OWNER);

            return $board;
        });

        return $board;
    }

    public function update(BoardDTO $boardDTO, Board $board): Board
    {
        return tap($board)->update([
            'name' => $boardDTO->name,
            'description' => $boardDTO->description,
            'visibility' => $boardDTO->visibility,
        ]);
    }
}
