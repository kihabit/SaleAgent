<?php

namespace App\Filament\Resources\FooterSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FooterSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
          FileUpload::make('logo_image')
    ->image()
    ->disk('public')
    ->directory('logos')
    ->label('Footer Logo'),

            TextInput::make('logo_alt_text')
                ->label('Logo Alt Text')
                ->placeholder('KDS ERP Crew')
                ->maxLength(255),

            TextInput::make('about_heading')
                ->label('About Heading')
                ->placeholder('About Key Dynamics Solutions (KDS)')
                ->maxLength(255),

            Textarea::make('about_text')
                ->label('About Text')
                ->rows(4),

            TextInput::make('info_heading')
                ->label('Info Section Heading')
                ->placeholder('Want to know more about KDS?')
                ->maxLength(255),

            Textarea::make('info_text')
                ->label('Info Section Text')
                ->rows(3),

            TextInput::make('info_link_text')
                ->label('Info Link Text')
                ->placeholder('Visit KDS Website →')
                ->maxLength(255),

            TextInput::make('info_link_url')
                ->label('Info Link URL')
                ->placeholder('https://kds.com')
                ->maxLength(255),

            TextInput::make('connect_heading')
                ->label('Connect Section Heading')
                ->placeholder('Connect With KDS')
                ->maxLength(255),

            Textarea::make('connect_text')
                ->label('Connect Section Text')
                ->rows(3),

            TextInput::make('copyright_text')
                ->label('Copyright Text')
                ->placeholder('© 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved.')
                ->maxLength(255),
        ]);
    }
}