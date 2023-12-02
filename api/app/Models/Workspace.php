<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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
            ->whereIn('id', auth()->user()->memberships->pluck('membershipable_id'))
            ->firstOrFail();
    }

    public function members(): MorphMany
    {
        return $this->morphMany(Membership::class, 'membershipable');
    }
}
