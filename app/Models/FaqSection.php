<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'eyebrow',
        'heading',
        'description',
        'question_1',
        'answer_1',
        'question_2',
        'answer_2',
        'question_3',
        'answer_3',
        'question_4',
        'answer_4',
        'question_5',
        'answer_5',
        'question_6',
        'answer_6',
    ];
}