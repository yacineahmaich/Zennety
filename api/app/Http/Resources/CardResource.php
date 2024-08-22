<?php

namespace App\Http\Resources;

use App\Models\Card;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $participants = User::whereHas('activities', function ($query) {
            $query->where('subject_type', Card::class)
                ->where('subject_id', $this->id);
        })->take(3)->get();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'statusId' => $this->status_id,
            'activities' => ActivityResource::collection($this->whenLoaded('activities')),
            'participants' => UserResource::collection($participants),
            'updatedAt' => $this->updated_at
        ];
    }
}
