<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'visibility',
        'owner_id',
    ];

    public function resolveRouteBinding($value, $field = null)
    {
        // TODO: Search in all user workspaces (owner or member)
        return $this
            ->where('id', $value)
            ->where('owner_id', auth()->id())
            ->firstOrFail();
    }

    public function owner(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'owner_id');
    }
}
