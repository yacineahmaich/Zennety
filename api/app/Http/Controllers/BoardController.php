<?php

namespace App\Http\Controllers;

use App\DTO\BoardDTO;
use App\Http\Requests\StoreBoardRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use App\Models\Workspace;
use App\Services\BoardService;
use App\Services\InvitationService;

class BoardController extends Controller
{
    public function __construct(
        public BoardService $service,
        public InvitationService $invitationService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace, Board $board)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request, Workspace $workspace)
    {
        $this->authorize('create', [Board::class, $workspace]);

        $board = $this->service->store(
            BoardDTO::fromRequest($request),
            $workspace
        );

        return BoardResource::make($board);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Board $board)
    {
        $this->authorize('view', $board);

        return BoardResource::make($board);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Board $board)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
        //
    }
}
