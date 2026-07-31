<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentCategory extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'has_demo', 'demo_url',
        'icon', 'order', 'is_active', 'created_by', 'updated_by'
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

    public function agents()
    {
        return $this->hasMany(Agent::class, 'category_id');
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