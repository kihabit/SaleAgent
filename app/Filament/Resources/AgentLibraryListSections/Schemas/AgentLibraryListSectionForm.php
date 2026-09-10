<?php

namespace App\Filament\Resources\AgentLibraryListSections\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AgentLibraryListSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->default(null),
                TextInput::make('heading')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('search_placeholder')
                    ->required()
                    ->default('Search'),
            ]);
    }
}
