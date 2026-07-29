<?php

namespace App\Filament\Resources\HeaderSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HeaderSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            FileUpload::make('logo_image')
                ->image()
                ->directory('logos')
                ->label('Logo Image'),

            TextInput::make('logo_text')
                ->label('Logo Text')
                ->maxLength(255),

            TextInput::make('logo_link')
                ->label('Logo Link')
                ->default('/')
                ->maxLength(255),

            Toggle::make('is_sticky')
                ->label('Sticky Header')
                ->default(true),

            TextInput::make('cta_text')
                ->label('Button Text')
                ->placeholder('Schedule Your AI Audit')
                ->maxLength(255),

            TextInput::make('cta_url')
                ->label('Button URL')
                ->placeholder('/contact')
                ->maxLength(255),

            Select::make('cta_style')
                ->label('Button Style')
                ->options([
                    'primary'   => 'Primary',
                    'secondary' => 'Secondary',
                ])
                ->default('primary'),
        ]);
    }
}