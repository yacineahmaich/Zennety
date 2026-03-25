<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use App\Enums\Visibility;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Workspace extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'name',
        'description',
        'visibility',
        'organization_id',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function members(): MorphMany
    {
        return $this->morphMany(Membership::class, 'membershipable');
    }

    /**
     * All boards for this workspace (no auth filter). Use for creation and counts.
     */
    public function allBoards(): HasMany
    {
        return $this->hasMany(Board::class);
    }

    public function boards(): HasMany
    {
        return $this->hasMany(Board::class)
            ->whereHas('members', function ($query) {
                $query->where('user_id', auth()->id());
            })
            // show public boards only when user is a member in workspace
            ->orWhere(function ($query) {
                $query->where('visibility', Visibility::PUBLIC)
                    ->whereHas('workspace.members', function ($query) {
                        $query->where('user_id', auth()->id());
                    });
            });
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
