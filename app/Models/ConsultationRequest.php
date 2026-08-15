<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'company_name',
        'country',
        'email',
        'phone',
        'looking_for',
        'message',
        'status',
    ];
}