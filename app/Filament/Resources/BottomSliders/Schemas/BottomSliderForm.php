<?php

namespace App\Filament\Resources\BottomSliders\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

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