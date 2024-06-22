<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCardCommentRequest;
use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Http\Resources\CardResource;
use App\Models\Board;
use App\Models\Card;
use App\Models\Status;
use App\Models\Workspace;
use App\Services\CardService;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class CardController extends Controller
{
    public function __construct(
        public CardService $service
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardRequest $request, Workspace $workspace, Board $board, Status $status)
    {
        $user = auth()->user();

        $pos = $status->cards()->max('pos');

        $card = $status->cards()->create([
            'name' => $request->validated('name'),
            'pos' => is_numeric($pos) ? $pos + 1 : 0
        ]);

        activity()
            ->performedOn($card)
            ->causedBy($user)
            ->log("$user->name created - $card->name.");

        return CardResource::make($card);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function comment(StoreCardCommentRequest $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $user = auth()->user();

        activity()
            ->performedOn($card)
            ->causedBy($user)
            ->withProperties(['type' => 'comment', 'comment' => $request->validated("comment")])
            ->log("$user->name added a comment.");

        return response()->noContent();
    }

    public function comments(Request $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $comments = Activity::where('properties->type', 'comment')
            ->whereMorphedTo('subject', $card)
            ->with("causer")
            ->latest()
            ->get();

        return response()->json($comments);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Board $board, Status $status, Card $card)
    {
        return CardResource::make($card);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $user = auth()->user();

        $updatedCard = tap($card)->update($request->validated());

        if ($card->name !== $updatedCard->name) {
            activity()
                ->performedOn($card)
                ->causedBy($user)
                ->log("$user->name renamed - $card->name to $updatedCard->name.");
        }

        return CardResource::make($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }

    public function reorder(Request $request, Workspace $workspace, Board $board)
    {
        // get moved card
        $card = Card::findOrFail($request->get('card_id'));

        // get target status
        $status = Status::with('cards')->findOrFail($request->get('status_id'));

        $this->service->reorder(
            $card,
            $status,
            $request->get('cards_order', [])
        );

        return response()->noContent();
    }
}
