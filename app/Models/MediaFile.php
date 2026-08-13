<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $fillable = ['name', 'path'];

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->path);
    }
}