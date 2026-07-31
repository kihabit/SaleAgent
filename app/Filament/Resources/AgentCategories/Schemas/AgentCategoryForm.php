<?php

namespace App\Filament\Resources\AgentCategories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AgentCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->label('Category Name')
                ->placeholder('D365, Finance, Supply Chain')
                ->required()
                ->maxLength(255),

            TextInput::make('slug')
                ->label('Short Code / Slug')
                ->placeholder('O2C, P2P')
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(3),

            Toggle::make('has_demo')
                ->label('Has Demo')
                ->default(false),

            TextInput::make('demo_url')
                ->label('Demo URL')
                ->maxLength(255),

            TextInput::make('icon')
                ->label('Icon')
                ->placeholder('heroicon-o-check-circle')
                ->maxLength(255),

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