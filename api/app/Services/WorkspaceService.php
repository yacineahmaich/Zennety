<?php


namespace App\Services;

use App\DTO\WorkspaceDTO;
use App\Models\Workspace;

class WorkspaceService
{
    public function store(WorkspaceDTO $workspaceDTO): Workspace
    {
        /**@var Workspace $workspace */
        $workspace = Workspace::create([
            'name' => $workspaceDTO->name,
            'description' => $workspaceDTO->description,
            'visibility' => $workspaceDTO->visibility,
        ]);

        // Create workspace owner
        $workspace->members()->create([
            "user_id" => auth()->id()
        ]);

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
