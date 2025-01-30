<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBoardRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use App\Models\Workspace;
use App\Services\BoardService;
use Illuminate\Http\Response;

class BoardController extends Controller
{
    public function __construct(
        public BoardService $service,
    ) {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request, Workspace $workspace): BoardResource
    {
        $this->authorize('create', [Board::class, $workspace]);

        $board = $this->service->createBoard(
            $workspace,
            $request->user(),
            $request->validated()
        );

        return BoardResource::make($board);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace, Board $board): BoardResource
    {
        $this->authorize('view', $board);

        return BoardResource::make($board->load(['members.user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Workspace $workspace, Board $board): BoardResource
    {
        $this->authorize('update', $board);

        $updatedBoard = $this->service->updateBoard($board, $request->validated());

        return BoardResource::make($updatedBoard);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace, Board $board): Response
    {
        $this->authorize("delete", $board);

        $this->service->deleteBoard($board);

        return response()->noContent();
    }
}
