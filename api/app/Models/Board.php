<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'visibility'
    ];

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function members(): MorphMany
    {
        return $this->morphMany(Membership::class, 'membershipable');
    }

    public function statuses(): HasMany
    {
        return $this->hasMany(Status::class);
    }

    public function invitations(): MorphMany
    {
        return $this->morphMany(Invitation::class, 'inviteable');
    }
}
