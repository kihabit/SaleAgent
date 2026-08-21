<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class HeroSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('heading')
                ->label('Heading')
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(3),
    FileUpload::make('image')
    ->image()
    ->disk('public')
    ->directory('hero-slides')
    ->label('Slide Image')
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
            TextInput::make('image_alt_text')
                ->label('Image Alt Text')
                ->placeholder('Digital Transaction Management Assistant dashboard')
                ->maxLength(255)
                ->required(),

            TextInput::make('btn1_text')->label('Button 1 Text'),
            TextInput::make('btn1_url')->label('Button 1 URL'),

            TextInput::make('btn2_text')->label('Button 2 Text'),
            TextInput::make('btn2_url')->label('Button 2 URL'),

            TextInput::make('btn3_text')->label('Button 3 Text'),
            TextInput::make('btn3_url')->label('Button 3 URL'),

            Repeater::make('stats')
                ->label('Stats')
                ->schema([
                    TextInput::make('number')
                        ->label('Number')
                        ->placeholder('68+')
                        ->required(),
                    TextInput::make('label')
                        ->label('Label')
                        ->placeholder('Transaction Use Cases')
                        ->required(),
                ])
                ->columns(2)
                ->defaultItems(0)
                ->addActionLabel('Add Stat'),

            TextInput::make('order')
                ->label('Order')
                ->numeric()
                ->default(0),

            Toggle::make('is_active')
                ->label('Active')
                ->default(true),
        ]);
    }
}