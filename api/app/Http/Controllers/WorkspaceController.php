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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkspaceRequest $request)
    {
        $workspace = $this->service->store(
            new WorkspaceDTO(
                name: $request->validated('name'),
                description: $request->validated('description')
            )
        );

        return WorkspaceResource::make($workspace);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace): WorkspaceResource
    {
        return WorkspaceResource::make($workspace);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkspaceRequest $request, Workspace $workspace): WorkspaceResource
    {
        $workspace = $this->service->update(
            new WorkspaceDTO(
                name: $request->validated('name'),
                description: $request->validated('description'),
            ),
            $workspace
        );

        return WorkspaceResource::make($workspace);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace): Response
    {
        $workspace->delete();

        return response()->noContent();
    }
}
