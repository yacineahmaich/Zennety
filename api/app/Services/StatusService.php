<?php


namespace App\Services;

use App\DTO\StatusDTO;
use App\Models\Board;
use App\Models\Status;

class StatusService
{
    public function store(StatusDTO $statusDTO, Board $board): Status
    {
        $status = $board->statuses()->create([
            'name' => $statusDTO->name,
        ]);

        return $status;
    }

    public function update(StatusDTO $statusDTO, Status $status): Status
    {
        return tap($status)->update([
            'name' => $statusDTO->name,
        ]);
    }
}
