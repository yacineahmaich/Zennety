<?php

namespace App\Http\Controllers;

use App\DTO\StatusDTO;
use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Http\Resources\StatusResource;
use App\Models\Board;
use App\Models\Status;
use App\Models\Workspace;
use App\Services\StatusService;

class StatusController extends Controller
{
    public function __construct(
        public StatusService $service
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Workspace $workspace, Board $board)
    {
        return StatusResource::collection($board->statuses->load('cards'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStatusRequest $request, Workspace $workspace, Board $board)
    {
        $status = $this->service->store(
            StatusDTO::fromRequest($request),
            $board
        );

        return StatusResource::make($status);
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStatusRequest $request, Status $status)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status)
    {
        //
    }
}
