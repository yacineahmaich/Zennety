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
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class CardController extends Controller
{
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
        $card = $status->cards()->create($request->validated());

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
    public function show(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Workspace $workspace, Board $board, Status $status, Card $card)
    {
        $card = tap($card)->update($request->validated());

        return CardResource::make($card);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $card)
    {
        //
    }
}
