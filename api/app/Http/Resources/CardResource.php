<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Spatie\Activitylog\Models\Activity;

class CardResource extends JsonResource
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
            'statusId' => $this->status_id,
            'comments' => Activity::where('causer_type', 'App\Models\User')
                ->where('causer_id', auth()->id())
                ->where('properties->type', 'comment')
                ->with("causer")
                ->latest()
                ->get(),
        ];
    }
}
