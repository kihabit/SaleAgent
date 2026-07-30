<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

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
                ->directory('hero-slides')
                ->label('Slide Image'),

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