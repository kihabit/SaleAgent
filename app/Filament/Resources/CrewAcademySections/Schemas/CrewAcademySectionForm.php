<?php

namespace App\Filament\Resources\CrewAcademySections\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class CrewAcademySectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Content')
                    ->columns(2)
                    ->schema([
                        TextInput::make('badge_text')
                            ->label('Badge Text')
                            ->required()
                            ->default('KDS ERP CREW ACADEMY'),

                        TextInput::make('heading')
                            ->label('Heading')
                            ->required(),

                        TextInput::make('subheading')
                            ->label('Subheading')
                            ->required(),

                        Textarea::make('description')
                            ->label('Description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Image')
                    ->columns(2)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image')
                            ->image(),

                        TextInput::make('image_alt')
                            ->label('Image Alt Text'),
                    ]),

            ]);
    }
}