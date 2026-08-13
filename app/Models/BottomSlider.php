<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BottomSlider extends Model
{
    protected $fillable = [
        'badge_text', 'page_slug', 'heading_normal', 'heading_highlighted',
        'description', 'primary_btn_text', 'primary_btn_link',
        'secondary_btn_text', 'secondary_btn_link', 'features', 'is_active',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}