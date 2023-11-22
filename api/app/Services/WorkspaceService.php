<?php


namespace App\Services;

use App\DTO\WorkspaceDTO;
use App\Models\Workspace;

class WorkspaceService
{
    public function store(WorkspaceDTO $workspaceDTO): Workspace
    {
        return Workspace::create([
            'title' => $workspaceDTO->title,
            'description' => $workspaceDTO->description,
            'owner_id' => auth()->id()
        ]);
    }

    public function update(WorkspaceDTO $workspaceDTO, Workspace $workspace): Workspace
    {
        return tap($workspace)->update([
            'title' => $workspaceDTO->title,
            'description' => $workspaceDTO->description,
        ]);
    }
}
