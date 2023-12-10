<?php


namespace App\Services;

use App\DTO\BoardDTO;
use App\Models\Board;
use App\Models\Workspace;

class BoardService
{
    public function store(BoardDTO $boardDTO, Workspace $workspace): Board
    {
        $board = $workspace->boards()->create([
            'name' => $boardDTO->name,
            'description' => $boardDTO->description,
            'visibility' => $boardDTO->visibility,
        ]);

        /**@var App\Models\Membership $owner */
        $owner = $board->members()->create([
            "user_id" => auth()->id()
        ]);

        $owner->assignRole('owner');

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
