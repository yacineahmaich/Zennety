<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Organization extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
    ];

    public function members(): MorphMany
    {
        return $this->morphMany(Membership::class, 'membershipable');
    }

    public function workspaces(): HasMany
    {
        return $this->hasMany(Workspace::class);
    }

    public function invitations(): MorphMany
    {
        return $this->morphMany(Invitation::class, 'inviteable');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->useFallbackUrl("https://ui-avatars.com/api/?background=000&color=fff&font-size=0.3&bold=true&name={$this->name}")
            ->singleFile();
    }
}
