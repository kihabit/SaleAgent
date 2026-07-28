<?php

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),

                Textarea::make('description')
                    ->rows(3),

                Select::make('status')
                    ->options([
                        'active'=>'Active',
                        'inactive'=>'Inactive',
                    ])
                    ->default('active')
                    ->required(),

                Toggle::make('is_system')
                    ->default(false),

            ]);
    }
}

