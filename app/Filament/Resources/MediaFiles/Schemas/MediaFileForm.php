<?php

namespace App\Filament\Resources\MediaFiles\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\HtmlString;

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

            Placeholder::make('full_url')
                ->label('Full URL')
                ->content(function ($record) {
                    if (! $record?->url) {
                        return '—';
                    }

                    $url = e($record->url);

                    return new HtmlString(
                        '<div style="display:flex;align-items:center;gap:8px;">'
                        . '<span>' . $url . '</span>'
                        . '<button type="button" '
                        . 'onclick="navigator.clipboard.writeText(\'' . $url . '\'); this.innerText=\'Copied!\'; setTimeout(() => this.innerText=\'Copy\', 1500);" '
                        . 'style="padding:4px 10px;border:1px solid #d1d5db;border-radius:6px;background:#f9fafb;cursor:pointer;font-size:12px;">'
                        . 'Copy'
                        . '</button>'
                        . '</div>'
                    );
                })
                ->columnSpanFull(),
        ]);
    }
}