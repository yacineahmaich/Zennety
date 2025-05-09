<?php


namespace App\Services;

use App\DTO\CardDTO;
use App\Models\Card;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Activitylog\Models\Activity;

class CardService
{

    public function createCard(Status $status, CardDTO $cardDTO): Card
    {
        $pos = $status->cards()->max('pos');

        // Give the card the last position in the status column
        $data["pos"] = is_numeric($pos) ? $pos + 1 : 0;

        // link assign via membership model
        if(isset($cardDTO->assignee)) {
            $cardDTO->assignee = $status->board->members()->where("id", $cardDTO->assignee)->value("user_id");
        }

        /** @var Card $card */
        $card = $status->cards()->create(
            array_merge($cardDTO->toArray(), [
                'pos' => is_numeric($pos) ? $pos + 1 : 0,
                'user_id' => $cardDTO->assignee
            ])
        );

        return $card;
    }

    public function updateCard(Card $card, CardDTO $cardDTO): Card
    {
        $data = $cardDTO->toArray();

        // link assign via membership model
        if (array_key_exists("assignee", $cardDTO->toArray())) {
            Log::info($cardDTO->assignee);
            if(is_null($cardDTO->assignee)) {
                $data['user_id'] = null;
            }else {
                $data['user_id'] = $card->board->members()->where("id", $cardDTO->assignee)->value("user_id");
            }
        }

        return tap($card)->update(
            array_merge($data)
        );
    }

    public function deleteCard(Card $card): void
    {
        $card->delete();
    }

    public function getCardComments(Card $card): Collection
    {
        $comments = Activity::where('properties->type', 'comment')
            ->whereMorphedTo('subject', $card)
            ->with("causer")
            ->latest()
            ->get();

        return $comments;
    }

    public function createComment(Card $card, User $user, array $data): void
    {
        activity()
            ->performedOn($card)
            ->causedBy($user)
            ->withProperties(['type' => 'comment', 'comment' => $data['comment']])
            ->log("$user->name added a comment - '{$data['comment']}'");

        $card->update([
            'updated_at' => now()
        ]);
    }

    public function reorderCards(array $params,  array $cards_order)
    {
        // get moved card
        $card = Card::findOrFail($params['card_id']);

        // get target status
        $status = Status::with('cards')->findOrFail($params['status_id']);

        DB::transaction(function () use ($card,$status,  $cards_order) {
            if($card->status_id !== $status->id) {
                $card = tap($card)->update(['status_id' => $status->id]);
            }

            foreach($status->cards as $card) {
                $card->update(['pos' => $cards_order[$card->id]]);
            }
        });
    }
}
