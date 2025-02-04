<?php


namespace App\Services;

use App\DTO\StatusDTO;
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

    public function createStatus(Board $board, StatusDTO $statusDTO): Status
    {
        $pos = $board->statuses()->max('pos');

        /** @var Status $status */
        $status = $board->statuses()->create(
            array_merge($statusDTO->toArray(), [
                'pos' => is_numeric($pos) ? $pos + 1 : 0
            ])
        );

        return $status;
    }

    public function updateStatus(Status $status, StatusDTO $statusDTO): Status
    {
        return tap($status)->update($statusDTO->toArray());
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
