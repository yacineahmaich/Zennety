<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

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
        'notification_id',
        'expires_at'
    ];

    public function resolveRouteBinding($value, $field = null)
    {
        return $this
            ->where('token', $value)
            ->where('expires_at', '>', now())
            ->firstOrFail();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invited():BelongsTo {
        return $this->belongsTo(User::class, 'invited_email', 'email');
    }

    public function inviteable(): MorphTo
    {
        return $this->morphTo();
    }

    public function notification(): BelongsTo {
        return $this->belongsTo(Notification::class);
    }

    public static function fromRequest(Request $request): Builder
    {
        $id = $request->route('id');
        $type = "App\\Models\\" . ucfirst($request->route('type'));

        return self::query()
            ->where('inviteable_id', $id)
            ->where('inviteable_type', $type);
    }
}
