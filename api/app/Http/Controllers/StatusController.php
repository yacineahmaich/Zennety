<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Http\Resources\StatusResource;
use App\Models\Board;
use App\Models\Status;
use App\Models\Workspace;
use App\Services\StatusService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use \Illuminate\Http\Response;

class StatusController extends Controller
{
    public function __construct(
        public StatusService $service
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace, Board $board): ResourceCollection
    {
        $statuses = $this->service->getBoardStatus($board);

        return StatusResource::collection($statuses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStatusRequest $request, Workspace $workspace, Board $board): StatusResource
    {
        $status = $this->service->createStatus(
            $board,
            $request->validated(),
        );

        return StatusResource::make($status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStatusRequest $request,Workspace $workspace, Board $board, Status $status): StatusResource
    {
        $updatedStatus = $this->service->updateStatus($status, $request->validated());

        return StatusResource::make($updatedStatus);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace, Board $board, Status $status): Response
    {
        $this->service->deleteStatus($status);

        return response()->noContent();
    }

    public function reorder(Request $request, Workspace $workspace, Board $board): Response
    {
        $this->service->reorderStatuses(
            $board,
            $request->get('statuses_order', [])
        );

        return response()->noContent();
    }
}
