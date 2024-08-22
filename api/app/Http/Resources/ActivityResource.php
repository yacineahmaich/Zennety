<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $type = (isset($this->properties["type"]) && $this->properties["type"] === "comment")  ? "comment" : "log";
        $description = $type === "comment" ? $this->properties["comment"] : $this->description;
        
        return [
            "id" => $this->id,
            "description" => $description,
            "type" => $type,
            "causer" => new UserResource($this->causer),
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at,
        ];
    }
}
