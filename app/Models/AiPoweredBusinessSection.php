<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiPoweredBusinessSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'heading_black',
        'heading_colored',
        'description',
        'feature_1_title',
        'feature_1_description',
        'feature_1_color',
        'feature_2_title',
        'feature_2_description',
        'feature_2_color',
        'feature_3_title',
        'feature_3_description',
        'feature_3_color',
    ];
}