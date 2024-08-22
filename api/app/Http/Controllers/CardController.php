<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCardCommentRequest;
use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Http\Resources\CardResource;
use App\Http\Resources\CommentResource;
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
            ->withProperties(['type' => 'comment', 'comment' => $request->comment])
            ->log("$user->name added a comment - '$request->comment'");

        $card->updated_at = now();
        $card->save();

        return response()->noContent();
    }

    public function comments(Request $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $comments = Activity::where('properties->type', 'comment')
            ->whereMorphedTo('subject', $card)
            ->with("causer")
            ->latest()
            ->get();

        return CommentResource::collection($comments);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Board $board, Status $status, Card $card)
    {
        return CardResource::make($card->load("activities"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $user = auth()->user();

        $oldCardName = $card->name;
        $updatedCard = tap($card)->update($request->validated());

        if ($oldCardName !== $updatedCard->name) {
            activity()
                ->performedOn($card)
                ->causedBy($user)
                ->log("$user->name renamed this card from '$oldCardName' to '$updatedCard->name'");
        }

        return CardResource::make($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $this->authorize("delete", [$board, $card]);

        $card->delete();

        return response()->noContent();
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
