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
            "related" => $this->inviteable,
            "relatedType" => $this->inviteable_type,
            "token" => $this->token,
            "role" => $this->role,
            "invitedEmail" => $this->invited_email,
            "message" => $this->message,
            "invitedBy" => UserResource::make($this->user),
            "expiresAt" => $this->expires_at,
        ];
    }
}
