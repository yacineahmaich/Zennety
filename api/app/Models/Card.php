<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Models\Activity;

class Card extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'pos',
        'status_id'
    ];

    public function status():BelongsTo {
        return $this->belongsTo(Status::class);
    }

    public function activities() {
        return $this->morphMany(Activity::class, 'subject');
    }
}
