<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    protected $fillable = [
        'ticket_code', 'category_id', 'reporter_name', 'reporter_phone', 'reporter_email',
        'title', 'description', 'district', 'village', 'full_location', 'photo_path', 'status',
        'latitude', 'longitude', 'geo_accuracy', 'verification_status', 'assigned_department',
        'assigned_officer', 'instruction', 'priority', 'channel', 'verified_at', 'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'geo_accuracy' => 'integer',
            'verified_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function attachments()
    {
        return $this->hasMany(ComplaintAttachment::class);
    }

    public function events()
    {
        return $this->hasMany(ComplaintEvent::class)->latest();
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
