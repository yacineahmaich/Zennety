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
        // get the resource 'App\Models\Workspace' => 'workspace'
        $resourceType = strtolower(explode('\\', $this->membershipable_type)[2]);
        
        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'resourceId' => $this->membershipable_id,
            'resourceType' => $resourceType,
            'profile' => UserResource::make($this->user),
            'permissions' => $this->getAllPermissions()->pluck('name'),
            'role' => $this->roles()->pluck('name')->first()
        ];
    }
}
