<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeaderSetting extends Model
{
    protected $fillable = [
        'logo_image', 'logo_text', 'logo_link', 'is_sticky',
        'cta_text', 'cta_url', 'cta_style', 'created_by', 'updated_by'
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