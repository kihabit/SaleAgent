<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MenuItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('label')
                    ->required(),
                TextInput::make('url')
                    ->url()
                    ->required(),
                TextInput::make('icon')
                    ->default(null),
                TextInput::make('description')
                    ->default(null),
                TextInput::make('target')
                    ->required()
                    ->default('_self'),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('parent_id')
                    ->numeric()
                    ->default(null),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('created_by')
                    ->numeric()
                    ->default(null),
                TextInput::make('updated_by')
                    ->numeric()
                    ->default(null),
            ]);
    }
}
