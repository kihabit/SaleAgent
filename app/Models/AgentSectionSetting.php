<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentSectionSetting extends Model
{
    protected $fillable = [
        'badge_text', 'heading', 'description',
        'cta_heading', 'cta_description', 'cta_button_text', 'cta_button_url',
        'created_by', 'updated_by'
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