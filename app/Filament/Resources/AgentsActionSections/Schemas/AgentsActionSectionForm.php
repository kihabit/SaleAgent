<?php

namespace App\Filament\Resources\AgentsActionSections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section as SchemaSection;
use Filament\Schemas\Schema;

class AgentsActionSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                SchemaSection::make('Section Heading')
                    ->columns(2)
                    ->schema([
                        TextInput::make('eyebrow')
                            ->required()
                            ->default('AI-Powered Workflows'),

                        TextInput::make('heading')
                            ->required()
                            ->default('AI Agents in Action'),

                        Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                SchemaSection::make('Card 1')
                    ->columns(2)
                    ->schema([
                        TextInput::make('card_1_label')
                            ->label('Label')
                            ->helperText('e.g. "Workflow Intelligence"')
                            ->required(),

                        TextInput::make('card_1_title')
                            ->label('Title')
                            ->helperText('e.g. "Intelligent Approvals"')
                            ->required(),

                        TextInput::make('card_1_slug')
                            ->label('Slug')
                            ->helperText('e.g. "intelligent-approvals"'),

                        FileUpload::make('card_1_image')
                            ->label('Image')
                            ->image(),

                        TextInput::make('card_1_image_alt')
                            ->label('Image Alt Text')
                            ->helperText('Describe the image for accessibility/SEO'),

                        Textarea::make('card_1_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                SchemaSection::make('Card 2')
                    ->columns(2)
                    ->schema([
                        TextInput::make('card_2_label')
                            ->label('Label')
                            ->required(),

                        TextInput::make('card_2_title')
                            ->label('Title')
                            ->required(),

                        TextInput::make('card_2_slug')
                            ->label('Slug'),

                        FileUpload::make('card_2_image')
                            ->label('Image')
                            ->image(),

                        TextInput::make('card_2_image_alt')
                            ->label('Image Alt Text'),

                        Textarea::make('card_2_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                SchemaSection::make('Card 3')
                    ->columns(2)
                    ->schema([
                        TextInput::make('card_3_label')
                            ->label('Label')
                            ->required(),

                        TextInput::make('card_3_title')
                            ->label('Title')
                            ->required(),

                        TextInput::make('card_3_slug')
                            ->label('Slug'),

                        FileUpload::make('card_3_image')
                            ->label('Image')
                            ->image(),

                        TextInput::make('card_3_image_alt')
                            ->label('Image Alt Text'),

                        Textarea::make('card_3_description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

            ]);
    }
}