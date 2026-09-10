<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrewAcademySection extends Model
{
    use HasFactory;

    protected $fillable = [
        'badge_text',
        'heading',
        'subheading',
        'description',
        'image',
        'image_alt',
    ];
}