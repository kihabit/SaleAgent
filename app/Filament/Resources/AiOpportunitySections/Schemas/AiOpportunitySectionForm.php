<?php

namespace App\Filament\Resources\AiOpportunitySections\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AiOpportunitySectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Content')
                    ->columns(2)
                    ->schema([
                        TextInput::make('slug')
                            ->default(null),

                        TextInput::make('eyebrow')
                            ->required()
                            ->default('AI Opportunity Guide'),

                        TextInput::make('heading')
                            ->required()
                            ->columnSpanFull(),

                        Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Button')
                    ->columns(2)
                    ->schema([
                        TextInput::make('button_text')
                            ->required()
                            ->default('Book a Demo'),

                       TextInput::make('button_url')
    ->default(null),
                    ]),

                Section::make("Who It's For")
                    ->schema([
                        TextInput::make('who_title')
                            ->required()
                            ->default('Who It\'s For:'),

                        TextInput::make('who_item_1')
                            ->label('Item 1')
                            ->default(null),

                        TextInput::make('who_item_2')
                            ->label('Item 2')
                            ->default(null),

                        TextInput::make('who_item_3')
                            ->label('Item 3')
                            ->default(null),

                        TextInput::make('who_item_4')
                            ->label('Item 4')
                            ->default(null),
                    ])
                    ->columns(2),

                Section::make('What You Can Do')
                    ->schema([
                        TextInput::make('what_title')
                            ->required()
                            ->default('What You Can Do:'),

                        TextInput::make('what_item_1')
                            ->label('Item 1')
                            ->default(null),

                        TextInput::make('what_item_2')
                            ->label('Item 2')
                            ->default(null),

                        TextInput::make('what_item_3')
                            ->label('Item 3')
                            ->default(null),

                        TextInput::make('what_item_4')
                            ->label('Item 4')
                            ->default(null),
                    ])
                    ->columns(2),

            ]);
    }
}