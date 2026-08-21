<?php

namespace App\Filament\Resources\MediaFiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Illuminate\Support\Str;

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
            ->getUploadedFileNameForStorageUsing(
                function ($file): string {
                    $originalName = pathinfo(
                        $file->getClientOriginalName(),
                        PATHINFO_FILENAME
                    );

                    $extension = $file->getClientOriginalExtension();

                    return Str::slug($originalName)
                        . '_'
                        . now('Asia/Kolkata')->format('Ymd_Hisv')
                        . '_IST_'
                        . Str::lower(Str::random(6))
                        . '.'
                        . $extension;
                }
            )
            ->afterStateUpdated(function ($state, callable $set, callable $get) {
                if ($get('name')) {
                    return;
                }

                $file = is_array($state)
                    ? ($state[array_key_first($state) ?? 0] ?? null)
                    : $state;

                if ($file instanceof TemporaryUploadedFile) {
                    $set('name', $file->getClientOriginalName());
                }
            }),

            TextInput::make('name')
                ->required(),
        ]);
    }
}