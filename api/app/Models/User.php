<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'bio',
        'password',
        'pins'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'pins' => 'array'
    ];

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function memberFor(Model $membershipable): ?Membership
    {
        return $this->memberships()
            ->where('membershipable_type', get_class($membershipable))
            ->where('membershipable_id', $membershipable->id)
            ->where('user_id', $this->id)
            ->first();
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
    
    public function scopeSearch(Builder $query, $search = ""): void
    {
        $query->where('name', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%');
    }
}
