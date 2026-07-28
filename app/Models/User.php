<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function hasPermission($permission)
    {

        if(!$this->role)
        {
            return false;
        }


        return $this->role
            ->permissions()
            ->where('slug',$permission)
            ->exists();

    }
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Automatically verify email when creating a user
     */
   protected static function booted()
    {
        static::creating(function ($user) {

            $user->email_verified_at ??= now();

            $user->status ??= 'active';

        });
    }

}
