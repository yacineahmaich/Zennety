<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $pinned = in_array("board_{$this->id}", array_keys($user->pins ?? []));

        return [
            'id' => $this->id,
            'workspaceId' => $this->workspace_id,
            'name' => $this->name,
            'description' => $this->description,
            'visibility' => $this->visibility,
            'members' => MembershipResource::collection($this->whenLoaded('members')),
            'statuses' => StatusResource::collection($this->whenLoaded('statuses')),
            'pinned' => $pinned,
            'updated_at' => $this->updated_at
        ];
    }
}
