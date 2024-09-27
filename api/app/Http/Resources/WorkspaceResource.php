<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkspaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'visibility' => $this->visibility,
            'members' => MembershipResource::collection($this->whenLoaded('members')),
            'boards' => BoardResource::collection($this->whenLoaded('boards')),
            'avatar' => $this->getFirstMediaUrl('avatar'),
            'has_avatar' => $this->hasMedia('avatar'),
        ];
    }
}
