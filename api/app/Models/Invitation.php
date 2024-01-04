<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Invitation extends Model
{
    use HasFactory;

    protected $casts = [
        'expires_at' => 'datetime'
    ];

    protected $fillable = [
        'token',
        'message',
        'role',
        'invited_id',
        'invited_email',
        'user_id',
        'expires_at'
    ];

    public function resolveRouteBinding($value, $field = null)
    {
        return $this
            ->where('expires_at', '>', now())
            ->firstOrFail();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function inviteable(): MorphTo
    {
        return $this->morphTo();
    }
}
