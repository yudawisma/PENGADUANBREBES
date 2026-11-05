<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplaintAttachment extends Model
{
    protected $fillable = ['complaint_id', 'path', 'original_name', 'mime_type', 'size'];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }
}
