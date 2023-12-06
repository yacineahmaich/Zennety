<?php


namespace App\Services;

use App\DTO\WorkspaceDTO;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;

class WorkspaceService
{
    public function getMyWorkspaces()
    {
        // TODO: Group query by owned workspaces and guest workspaces
        return WorkspaceResource::collection(
            Workspace::with('members')->whereHas('members', function ($query) {
                    $query->where('user_id', auth()->id());
                })->get()
        );
    }

    public function store(WorkspaceDTO $workspaceDTO): Workspace
    {
        /**@var Workspace $workspace */
        $workspace = Workspace::create([
            'name' => $workspaceDTO->name,
            'description' => $workspaceDTO->description,
            'visibility' => $workspaceDTO->visibility,
        ]);

        // Create workspace owner
        /**@var App\Models\Membership $owner */
        $owner = $workspace->members()->create([
            "user_id" => auth()->id()
        ]);

        $owner->assignRole('owner');

        return $workspace;
    }

    public function update(WorkspaceDTO $workspaceDTO, Workspace $workspace): Workspace
    {
        return tap($workspace)->update([
            'name' => $workspaceDTO->name,
            'description' => $workspaceDTO->description,
            'visibility' => $workspaceDTO->visibility,
        ]);
    }
}
