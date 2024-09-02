<?php

namespace App\Models;

use App\Observers\CardObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Models\Activity;

#[ObservedBy([CardObserver::class])]
class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'pos',
        'priority',
        'deadline',
        'status_id',
        'user_id',
    ];

    protected $casts = [
        "deadline" => "datetime",
    ];

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    public function activities()
    {
        return $this->morphMany(Activity::class, 'subject');
    }
}
