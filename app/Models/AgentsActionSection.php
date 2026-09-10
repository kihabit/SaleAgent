<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentsActionSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'eyebrow',
        'heading',
        'description',
        'card_1_label',
        'card_1_title',
        'card_1_slug',
        'card_1_description',
        'card_1_image',
        'card_1_image_alt',
        'card_2_label',
        'card_2_title',
        'card_2_slug',
        'card_2_description',
        'card_2_image',
        'card_2_image_alt',
        'card_3_label',
        'card_3_title',
        'card_3_slug',
        'card_3_description',
        'card_3_image',
        'card_3_image_alt',
    ];
}