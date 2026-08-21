<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class BottomSlider extends Model
{
    protected $fillable = [
        'badge_text', 'page_slug', 'heading_normal', 'heading_highlighted',
        'description', 'background_image', 'background_image_alt',
        'primary_btn_text', 'primary_btn_link',
        'secondary_btn_text', 'secondary_btn_link', 'features', 'is_active',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    protected function backgroundImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}