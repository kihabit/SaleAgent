<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'heading', 'description', 'slug', 'image', 'image_alt_text',
        'btn1_text', 'btn1_url',
        'btn2_text', 'btn2_url',
        'btn3_text', 'btn3_url',
        'stats', 'order', 'is_active',
        'created_by', 'updated_by'
    ];

    protected $casts = [
        'stats' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = auth()->id();
            $model->updated_by = auth()->id();
        });

        static::updating(function ($model) {
            $model->updated_by = auth()->id();
        });
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}