<?php

namespace App\Filament\Resources\AiPoweredBusinessSections\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AiPoweredBusinessSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Main Heading')
                    ->columns(2)
                    ->schema([
                        TextInput::make('heading_black')
                            ->label('Heading (Black part)')
                            ->helperText('e.g. "KDS ERP Crew"')
                            ->required(),

                        TextInput::make('heading_colored')
                            ->label('Heading (Colored part)')
                            ->helperText('e.g. "AI-Powered Business Transformation"')
                            ->required(),

                        Textarea::make('description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Feature 1')
                    ->columns(2)
                    ->schema([
                        TextInput::make('feature_1_title')
                            ->label('Title')
                            ->required()
                            ->default('Automate'),

                        ColorPicker::make('feature_1_color')
                            ->label('Accent Color')
                            ->required()
                            ->default('#fba226'),

                        Textarea::make('feature_1_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Feature 2')
                    ->columns(2)
                    ->schema([
                        TextInput::make('feature_2_title')
                            ->label('Title')
                            ->required()
                            ->default('Scale'),

                        ColorPicker::make('feature_2_color')
                            ->label('Accent Color')
                            ->required()
                            ->default('#2ababe'),

                        Textarea::make('feature_2_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Feature 3')
                    ->columns(2)
                    ->schema([
                        TextInput::make('feature_3_title')
                            ->label('Title')
                            ->required()
                            ->default('Govern'),

                        ColorPicker::make('feature_3_color')
                            ->label('Accent Color')
                            ->required()
                            ->default('#051895'),

                        Textarea::make('feature_3_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

            ]);
    }
}