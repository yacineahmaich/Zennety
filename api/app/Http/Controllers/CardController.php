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
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class CardController extends Controller
{
    public function __construct(
        public CardService $service
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardRequest $request, Workspace $workspace, Board $board, Status $status): CardResource
    {
        $card = $this->service->createCard($status, $request->validated());

        return CardResource::make($card);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Board $board, Status $status, Card $card): CardResource
    {
        return CardResource::make($card->load("activities"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Workspace $workspace, Board $board, Status $status, Card $card): CardResource
    {
        $this->service->updateCard($card, $request->validated());

        return CardResource::make($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace, Board $board, Status $status, Card $card): Response
    {
        $this->authorize("delete", [$board, $card]);

        $this->service->deleteCard($card);

        return response()->noContent();
    }

    public function reorder(Request $request, Workspace $workspace, Board $board): Response
    {
        $this->service->reorderCards(
            $request->only(['status_id', 'card_id']),
            $request->get('cards_order', [])
        );

        return response()->noContent();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function comment(StoreCardCommentRequest $request, Workspace $workspace, Board $board, Status $status, Card $card): Response
    {
        $this->service->createComment(
            $card,
            $request->user(),
            $request->validated()
        );

        return response()->noContent();
    }

    public function comments(Request $request, Workspace $workspace, Board $board, Status $status, Card $card): ResourceCollection
    {
        $comments = $this->service->getCardComments($card);

        return CommentResource::collection($comments);
    }
}
