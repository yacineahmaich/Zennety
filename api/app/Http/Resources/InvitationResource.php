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
        // get the resource 'App\Models\Workspace' => 'workspace'
        $related_type = strtolower(explode('\\', $this->inviteable_type)[2]);
        
        $related = null;

        if($related_type === "workspace") {
            $related = WorkspaceResource::make($this->inviteable);
        }elseif($related_type === "board") {
            $related = BoardResource::make($this->inviteable);
        }

        return [
            "id" => $this->id,
            "related" => $related,
            "relatedId" => $this->inviteable->id,
            "relatedType" => $related_type,
            "token" => $this->token,
            "role" => $this->role,
            "invitedEmail" => $this->invited_email,
            "message" => $this->message,
            "invitedBy" => UserResource::make($this->user),
            "expiresAt" => $this->expires_at,
        ];
    }
}
