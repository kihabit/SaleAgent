<?php

namespace App\Filament\Resources\FaqSections\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class FaqSectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Section Heading')
                    ->columns(2)
                    ->schema([
                        TextInput::make('eyebrow')
                            ->required()
                            ->default('Need to know more?'),

                        TextInput::make('heading')
                            ->required()
                            ->default('Frequently Asked Questions'),

                        Textarea::make('description')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Question 1')
                    ->schema([
                        TextInput::make('question_1')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_1')
                            ->label('Answer')
                            ->required(),
                    ]),

                Section::make('Question 2')
                    ->schema([
                        TextInput::make('question_2')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_2')
                            ->label('Answer')
                            ->required(),
                    ]),

                Section::make('Question 3')
                    ->schema([
                        TextInput::make('question_3')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_3')
                            ->label('Answer')
                            ->required(),
                    ]),

                Section::make('Question 4')
                    ->schema([
                        TextInput::make('question_4')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_4')
                            ->label('Answer')
                            ->required(),
                    ]),

                Section::make('Question 5')
                    ->schema([
                        TextInput::make('question_5')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_5')
                            ->label('Answer')
                            ->required(),
                    ]),

                Section::make('Question 6')
                    ->schema([
                        TextInput::make('question_6')
                            ->label('Question')
                            ->required(),
                        Textarea::make('answer_6')
                            ->label('Answer')
                            ->required(),
                    ]),

            ]);
    }
}