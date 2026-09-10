<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentLibraryListSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'heading',
        'description',
        'search_placeholder',
    ];
}