<?php


namespace App\Services;

use App\Models\Board;
use App\Models\Status;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class StatusService
{
    public function getBoardStatus(Board $board): Collection
    {
        return $board
            ->statuses()
            ->orderBy('pos')
            ->get()
            ->load('cards');
    }

    public function createStatus(Board $board, array $data): Status
    {
        $pos = $board->statuses()->max('pos');

        /** @var Status $status */
        $status = $board->statuses()->create([
            'name' => $data["name"],
            'pos' => is_numeric($pos) ? $pos + 1 : 0
        ]);

        return $status;
    }

    public function updateStatus(Status $status, array $data): Status
    {
        return tap($status)->update($data);
    }

    public function deleteStatus(Status $status): void
    {
        $status->delete();
    }

    public function reorderStatuses(Board $board, array $statuses_order): void
    {
        $statuses = $board->statuses()->orderBy('pos')->get();

        DB::transaction(function () use ($statuses, $statuses_order) {
            foreach($statuses as $status) {
                $status->update(['pos' => $statuses_order[$status->id]]);
            }
        });
    }
}
