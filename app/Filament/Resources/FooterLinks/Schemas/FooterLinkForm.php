<?php

namespace App\Filament\Resources\FooterLinks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FooterLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('group')
                    ->label('Footer Column')
                    ->options([
                        'agent_library' => 'Agent Library',
                        'quick_links' => 'Quick Links',
                    ])
                    ->required(),
                TextInput::make('label')
                    ->required(),
                TextInput::make('url')
                    ->label('URL')
                    ->helperText('Can be a relative path (e.g. /agent-library#catalogue) or a full URL (e.g. https://example.com)')
                    ->required(),
                Toggle::make('is_external')
                    ->label('Opens in new tab')
                    ->default(false),
                TextInput::make('order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->default(true),
            ]);
    }
}