<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "token" => $this->token,
            "email" => $this->email,
            "message" => $this->message,
            "invitedBy" => UserResource::make($this->user),
            "worksapce" => WorkspaceResource::make($this->whenLoaded('worksapce')),
            "expiresAt" => $this->expires_at,
        ];
    }
}
