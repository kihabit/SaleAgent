<?php

namespace App\Filament\Resources\CatalogueSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CatalogueSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            Section::make('Hero Content')
                ->schema([
                    TextInput::make('badge_text')
                        ->label('Badge Text')
                        ->placeholder('AI AGENT CATALOGUE')
                        ->maxLength(255),

                    TextInput::make('heading')
                        ->label('Heading')
                        ->placeholder('Your AI Workforce for Every Business Function')
                        ->maxLength(255),

                    TextInput::make('slug')
                        ->label('Slug')
                        ->placeholder('agent-library')
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    Textarea::make('description')
                        ->label('Description')
                        ->rows(3)
                        ->columnSpanFull(),
                ])
                ->columns(2),

            Section::make('Hero Image')
                ->schema([
                    FileUpload::make('hero_image')
                        ->label('Hero Image')
                        ->image(),

                    TextInput::make('hero_image_alt')
                        ->label('Image Alt Text')
                        ->placeholder('AI agent dashboard illustration')
                        ->maxLength(255),
                ])
                ->columns(2),

            Section::make('Feature 1')
                ->schema([
                    TextInput::make('feature_1_icon')
                        ->label('Icon')
                        ->placeholder('e.g. cpu, chip, automation')
                        ->maxLength(255),

                    TextInput::make('feature_1_title')
                        ->label('Title')
                        ->placeholder('AI-Powered Automation')
                        ->maxLength(255),
                ])
                ->columns(2),

            Section::make('Feature 2')
                ->schema([
                    TextInput::make('feature_2_icon')
                        ->label('Icon')
                        ->placeholder('e.g. workflow, network')
                        ->maxLength(255),

                    TextInput::make('feature_2_title')
                        ->label('Title')
                        ->placeholder('Smarter Workflows')
                        ->maxLength(255),
                ])
                ->columns(2),

            Section::make('Feature 3')
                ->schema([
                    TextInput::make('feature_3_icon')
                        ->label('Icon')
                        ->placeholder('e.g. chart, insights')
                        ->maxLength(255),

                    TextInput::make('feature_3_title')
                        ->label('Title')
                        ->placeholder('Real-Time Insights')
                        ->maxLength(255),
                ])
                ->columns(2),

            Section::make('Notice')
                ->schema([
                    Textarea::make('notice_text')
                        ->label('Notice Text')
                        ->rows(2)
                        ->columnSpanFull(),

                    TextInput::make('notice_link_text')
                        ->label('Notice Link Text')
                        ->placeholder('Contact us to get started →')
                        ->maxLength(255),

                    TextInput::make('notice_link_url')
                        ->label('Notice Link URL')
                        ->placeholder('https://keydynamicssolutions.com/')
                        ->maxLength(255),
                ])
                ->columns(2),

        ]);
    }
}