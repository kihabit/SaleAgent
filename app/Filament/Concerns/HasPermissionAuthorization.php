<?php

namespace App\Filament\Concerns;

use Illuminate\Support\Str;

trait HasPermissionAuthorization
{
    protected static function permissionSlugPrefix(): string
    {
        $name = class_basename(static::class);
        $name = str_replace('Resource', '', $name);
        return Str::snake(Str::plural($name));
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->hasPermission(static::permissionSlugPrefix() . '.view') ?? false;
    }

    public static function canCreate(): bool
    {
        return auth()->user()?->hasPermission(static::permissionSlugPrefix() . '.create') ?? false;
    }

    public static function canEdit($record): bool
    {
        return auth()->user()?->hasPermission(static::permissionSlugPrefix() . '.edit') ?? false;
    }

    public static function canDelete($record): bool
    {
        return auth()->user()?->hasPermission(static::permissionSlugPrefix() . '.delete') ?? false;
    }
}