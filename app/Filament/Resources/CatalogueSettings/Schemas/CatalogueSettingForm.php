<?php

namespace App\Filament\Resources\CatalogueSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CatalogueSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('badge_text')
                ->label('Badge Text')
                ->placeholder('FULL CATALOGUE')
                ->maxLength(255),

            TextInput::make('heading')
                ->label('Heading')
                ->placeholder('The KDS ERP Crew Agent Library')
                ->maxLength(255),

            TextInput::make('slug')
                ->label('Slug')
                ->placeholder('agent-library')
                ->unique(ignoreRecord: true)
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(3),

            Textarea::make('notice_text')
                ->label('Notice Text')
                ->rows(2),

            TextInput::make('notice_link_text')
                ->label('Notice Link Text')
                ->placeholder('Contact us to get started →')
                ->maxLength(255),

            TextInput::make('notice_link_url')
                ->label('Notice Link URL')
                ->placeholder('https://keydynamicssolutions.com/')
                ->maxLength(255),
        ]);
    }
}