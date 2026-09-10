<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiOpportunitySection extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'eyebrow',
        'heading',
        'description',
        'button_text',
        'button_url',
        'who_title',
        'who_item_1',
        'who_item_2',
        'who_item_3',
        'who_item_4',
        'what_title',
        'what_item_1',
        'what_item_2',
        'what_item_3',
        'what_item_4',
    ];
}