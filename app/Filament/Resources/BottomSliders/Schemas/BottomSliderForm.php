<?php

namespace App\Filament\Resources\BottomSliders\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BottomSliderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('badge_text')
                    ->default(null),
                TextInput::make('page_slug')
                    ->default(null),
                TextInput::make('heading_normal')
                    ->required(),
                TextInput::make('heading_highlighted')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                FileUpload::make('background_image')
                    ->image()
                    ->disk('public')
                    ->directory('bottom-sliders')
                    ->label('Background Image')
                    ->required()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxSize(2048)
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
                    ->helperText('Required. JPG, PNG or WEBP. Max size 2MB.'),
                TextInput::make('background_image_alt')
                    ->label('Image Alt Text')
                    ->placeholder('AI co-worker section background')
                    ->maxLength(255)
                    ->required(),
                TextInput::make('primary_btn_text')
                    ->default(null),
                TextInput::make('primary_btn_link')
                    ->default(null),
                TextInput::make('secondary_btn_text')
                    ->default(null),
                TextInput::make('secondary_btn_link')
                    ->default(null),
             Repeater::make('features')
    ->simple(
        TextInput::make('title')
            ->required()
    )
    ->default([])
    ->columnSpanFull()
    ->reorderable()
    ->addActionLabel('Add Feature'),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}