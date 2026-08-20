<?php

namespace App\Filament\Resources\MediaFiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;

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
                ->preserveFilenames()
                ->live()
                ->afterStateUpdated(function ($state, callable $set, callable $get) {
                    if ($get('name')) {
                        return;
                    }

                    $file = is_array($state) ? ($state[array_key_first($state) ?? 0] ?? null) : $state;

                    if ($file instanceof TemporaryUploadedFile) {
                        $set('name', $file->getClientOriginalName());
                    }
                }),

            TextInput::make('name')
                ->required(),
        ]);
    }
}