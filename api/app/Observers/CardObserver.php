<?php

namespace App\Observers;

use App\Models\Card;
use App\Models\Status;

class CardObserver
{
    /**
     * Handle the Card "created" event.
     */
    public function created(Card $card): void
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        activity()
            ->performedOn($card)
            ->causedBy($user)
            ->log("$user->name created - $card->name.");
    }

    /**
     * Handle the Card "updated" event.
     */
    public function updated(Card $card): void
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $changes = $card->getChanges();

        if (isset($changes['name'])) {
            $log = "$user->name changed the name to '{$changes['name']}'";
        }

        if (isset($changes['priority'])) {
            $log = "{$user->name} changed the priority to '{$changes['priority']}'";
        }

        if (isset($changes['deadline'])) {
            $log = "{$user->name} changed the deadline date to '{$changes['deadline']}'";
        }

        if (isset($changes['status_id'])) {
            $statusName = Status::query()->whereKey($changes['status_id'])->value('name') ?? '';
            $log = "{$user->name} changed the status to '{$statusName}'";
        }

        if (isset($changes['user_id'])) {
            $assigned_to = $user->id === $changes['user_id'] ? 'him self' : "'{$card->assignee->name}'";
            $log = "{$user->name} assigned this card to {$assigned_to}";
        }

        if (isset($log)) {
            activity()
                ->performedOn($card)
                ->causedBy($user)
                ->log($log);
        }
    }

    /**
     * Handle the Card "deleted" event.
     */
    public function deleted(Card $card): void
    {
        //
    }

    /**
     * Handle the Card "restored" event.
     */
    public function restored(Card $card): void
    {
        //
    }

    /**
     * Handle the Card "force deleted" event.
     */
    public function forceDeleted(Card $card): void
    {
        //
    }
}
