<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Enums\Visibility;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'visibility',
    ];

    public function resolveRouteBinding($value, $field = null)
    {
        return $this
            ->where('id', $value)
            ->where(function ($query) {
                $query->whereIn(
                    'id',
                    auth()->user()
                        ->memberships()
                        ->where('membershipable_type', 'App\Models\Workspace')
                        ->select('membershipable_id')
                )
                    ->orWhere('visibility', Visibility::PUBLIC);
            })
            ->firstOrFail();
    }

    public function members(): MorphMany
    {
        return $this->morphMany(Membership::class, 'membershipable');
    }

    public function boards(): HasMany
    {
        return $this->hasMany(Board::class);
    }

    public function invitations(): MorphMany
    {
        return $this->morphMany(Invitation::class, 'inviteable');
    }
}
