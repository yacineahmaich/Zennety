<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Http\Requests\StoreWorkspaceRequest;
use App\Http\Requests\UpdateWorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Membership;
use App\Models\Workspace;
use App\Services\InvitationService;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class WorkspaceController extends Controller
{
    public function __construct(
        public WorkspaceService $service,
        public InvitationService $invitationService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): ResourceCollection
    {
        $workspaces = $this->service->getMyWorkspaces($request->user());

        return WorkspaceResource::collection($workspaces);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkspaceRequest $request): WorkspaceResource
    {
        $workspace = $this->service->createWorkspace(
            $request->validated(),
            $request->user()
        );

        return WorkspaceResource::make($workspace);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace): WorkspaceResource
    {
        $this->authorize('view', $workspace);

        return WorkspaceResource::make($workspace->load(['members.user', 'boards.members.user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkspaceRequest $request, Workspace $workspace): WorkspaceResource
    {
        $this->authorize('update', $workspace);

        $updatedWorkspace = $this->service->updateWorkspace($workspace, $request->validated());

        return WorkspaceResource::make($updatedWorkspace);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace): Response
    {
        $this->authorize('delete', $workspace);

        $this->service->deleteWorkspace($workspace);

        return response()->noContent();
    }

    /**
     * Transfer workspace ownership to an admin
     */
    public function tranferOwnership(Request $request, Workspace $workspace, Membership $membership): Response
    {
        $this->authorize('transferOwnership', [$workspace, $membership]);

        $this->service->tranferOwnership($workspace, $request->user(), $membership);

        return response()->noContent();
    }

    /**
     * Update workspace avatar
     */
    public function updateAvatar(Request $request, Workspace $workspace)
    {
        $this->authorize('update', $workspace);

        $this->service->updateWorkspaceAvatar($workspace, $request->avatar);

        return response()->noContent();
    }
}
