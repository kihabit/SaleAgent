<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    protected $fillable = [
        'title',
        'description',
        'steps_count',
        'automation_percentage',
        'outcome_label',
        'slug',
        'sort_order',
        'is_active',
    ];
}