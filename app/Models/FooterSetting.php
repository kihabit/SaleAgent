<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = [
        'logo_image', 'logo_alt_text', 'about_heading', 'about_text',
        'info_heading', 'info_text', 'info_link_text', 'info_link_url',
        'connect_heading', 'connect_text',
        'contact_heading', 'contact_addresses', 'contact_email', 'contact_phone',
        'copyright_text',
        'created_by', 'updated_by'
    ];

    protected $casts = [
        'contact_addresses' => 'array',
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