<?php

namespace App\Filament\Resources\MediaFiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MediaFileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            FileUpload::make('path')
                ->label('Image')
                ->image()
                ->disk('public')
                ->directory('media')
                ->required()
                ->live()
                ->afterStateUpdated(function ($state, callable $set, callable $get) {
                    if (!$get('name') && $state) {
                        $set('name', basename($state));
                    }
                }),

            TextInput::make('name')
                ->required(),
        ]);
    }
}