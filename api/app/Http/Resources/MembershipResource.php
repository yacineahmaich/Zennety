<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipResource extends JsonResource
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
            'profile' => UserResource::make($this->user),
            // TODO: we should select name attribute at database query level for performance 
            'permissions' => $this->getAllPermissions()->pluck('name'),
            'role' => $this->roles()->pluck('name')->first()
        ];
    }
}
