<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invitation extends Model
{
    use HasFactory;

    protected $casts = [
        "expires_at" => "datetime"
    ];

    protected $fillable = [
        "token",
        "email",
        "message",
        "user_id",
        "worksapce_id",
        "expires_at"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
