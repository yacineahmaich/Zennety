<?php


namespace App\Services;

use App\DTO\StatusDTO;
use App\Models\Board;
use App\Models\Status;
use Illuminate\Support\Facades\DB;

class StatusService
{
    public function store(StatusDTO $statusDTO, Board $board): Status
    {
        $pos = $board->statuses()->max('pos');
        $status = $board->statuses()->create([
            'name' => $statusDTO->name,
            'pos' => is_numeric($pos) ? $pos + 1 : 0
        ]);

        return $status;
    }

    public function update(StatusDTO $statusDTO, Status $status): Status
    {
        return tap($status)->update([
            'name' => $statusDTO->name,
        ]);
    }

    public function reorder($statuses = [], array $statuses_order)
    {
        DB::transaction(function () use ($statuses, $statuses_order) {
            foreach($statuses as $status) {
                $status->update(['pos' => $statuses_order[$status->id]]);
            }
        });
    }
}
