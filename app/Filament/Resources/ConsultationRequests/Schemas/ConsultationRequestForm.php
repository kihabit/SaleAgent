<?php

namespace App\Filament\Resources\ConsultationRequests\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ConsultationRequestForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->required(),
                TextInput::make('last_name')
                    ->default(null),
                TextInput::make('company_name')
                    ->default(null),
                TextInput::make('country')
                    ->default(null),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('phone')
                    ->tel()
                    ->default(null),
                TextInput::make('looking_for')
                    ->default(null),
                Textarea::make('message')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('status')
                    ->required()
                    ->default('new'),
            ]);
    }
}
