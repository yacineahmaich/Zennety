<?php

namespace App\Http\Controllers;

use App\DTO\WorkspaceDTO;
use App\Http\Requests\StoreWorkspaceRequest;
use App\Http\Requests\UpdateWorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
use App\Services\WorkspaceService;
use Illuminate\Http\Response;

class WorkspaceController extends Controller
{
    public function __construct(
        public WorkspaceService $service,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workspaces = $this->service->getMyWorkspaces();

        return WorkspaceResource::collection($workspaces);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkspaceRequest $request)
    {
        $workspace = $this->service->store(
            WorkspaceDTO::fromRequest($request),
        );

        return WorkspaceResource::make($workspace);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace): WorkspaceResource
    {
        $this->authorize('view', $workspace);

        return WorkspaceResource::make($workspace->load('boards'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkspaceRequest $request, Workspace $workspace): WorkspaceResource
    {
        $this->authorize('update', $workspace);

        $workspace = $this->service->update(
            WorkspaceDTO::fromRequest($request),
            $workspace
        );

        return WorkspaceResource::make($workspace);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace): Response
    {
        $this->authorize('delete', $workspace);

        $workspace->delete();

        return response()->noContent();
    }
}
