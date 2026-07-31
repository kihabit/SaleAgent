<?php

namespace App\Filament\Resources\Agents\Schemas;

use App\Models\AgentCategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AgentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('category_id')
                ->label('Category')
                ->relationship('category', 'name')
                ->required()
                ->searchable()
                ->preload(),

            TextInput::make('name')
                ->label('Agent Name')
                ->placeholder('Purchase Requisition Agent')
                ->required()
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(4),

            Toggle::make('has_demo')
                ->label('Has Demo')
                ->default(false),

            TextInput::make('demo_url')
                ->label('Demo URL')
                ->placeholder('/demo/agent-1')
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