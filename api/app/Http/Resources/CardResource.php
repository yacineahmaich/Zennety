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
        $activities = Activity::whereMorphedTo('subject', $this)
            ->with("causer")
            ->get();

        $participants = [];

        foreach($activities as $activity) {
            if(!in_array($activity->causer->id, array_keys($participants))) {
                $participants[$activity->causer->id] = $activity->causer;
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'statusId' => $this->status_id,
            'activities' => $activities,
            'participants' => array_values($participants),
            'updatedAt' => $this->updated_at
        ];
    }
}
