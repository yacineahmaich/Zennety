<?php


namespace App\Services;

use Illuminate\Support\Facades\DB;

class CardService
{
    public function reorder($card, $status,  array $cards_order)
    {
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
