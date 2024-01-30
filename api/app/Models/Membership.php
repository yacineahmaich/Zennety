<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;
use Spatie\Permission\Traits\HasRoles;

class Membership extends Model
{
    use HasFactory, HasRoles;

    protected $guard_name = 'web';

    protected $fillable = [
        'user_id'
    ];

    public function membershipable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function fromRequest(Request $request): Builder
    {
        $id = $request->route('id');
        $type = "App\\Models\\" . ucfirst($request->route('type'));

        return self::query()
            ->where('membershipable_id', $id)
            ->where('membershipable_type', $type);
    }
}
