<?php

namespace App\Http\Controllers;

use App\DTO\WorkspaceDTO;
use App\Enums\Role;
use App\Http\Requests\StoreWorkspaceRequest;
use App\Http\Requests\UpdateWorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
use App\Services\InvitationService;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class WorkspaceController extends Controller
{
    public function __construct(
        public WorkspaceService $service,
        public InvitationService $invitationService
    ) {}

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

        return WorkspaceResource::make($workspace->load(['members.user', 'boards.members.user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkspaceRequest $request, Workspace $workspace): WorkspaceResource
    {
        $this->authorize('update', $workspace);

        $updatedWorkspace = tap($workspace)->update($request->validated());

        return WorkspaceResource::make($updatedWorkspace);
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

    /**
     * Transfer workspace ownership to an admin
     */
    public function tranferOwnership(Request $request, Workspace $workspace): Response
    {
        $this->authorize('transferOwnership', $workspace);

        /**
         * @var \App\Models\User $user
         */
        $user = auth()->user();

        DB::transaction(function () use ($request, $workspace, $user) {
            $newOwnerMembership = $workspace->members()->where('user_id', $request->newOwner)->firstOrFail();

            $currentOwnerMembership = $user->memberFor($workspace);

            $currentOwnerMembership->syncRoles([Role::ADMIN]);

            $newOwnerMembership->syncRoles([Role::OWNER]);
        });

        return response()->noContent();
    }

    public function setAvatar(Request $request, Workspace $workspace)
    {
        $request->validate([
            "avatar" => ["required", "image", "max:1024"]
        ]);

        $workspace->addMediaFromRequest('avatar')
            ->toMediaCollection('avatar');

        return response()->noContent();
    }

    public function deleteAvatar(Request $request, Workspace $workspace)
    {
        $workspace->getFirstMedia('avatar')?->delete();

        return response()->noContent();
    }
}
