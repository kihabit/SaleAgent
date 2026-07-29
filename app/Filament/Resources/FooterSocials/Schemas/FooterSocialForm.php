<?php

namespace App\Filament\Resources\FooterSocials\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FooterSocialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('platform')
                ->label('Platform')
                ->options([
                    'LinkedIn'  => 'LinkedIn',
                    'Facebook'  => 'Facebook',
                    'X'         => 'X (Twitter)',
                    'YouTube'   => 'YouTube',
                    'Instagram' => 'Instagram',
                ])
                ->required(),

            TextInput::make('icon')
                ->label('Icon Name')
                ->placeholder('linkedin, facebook, x-twitter, youtube, instagram')
                ->maxLength(255),

            TextInput::make('url')
                ->label('Profile URL')
                ->placeholder('https://linkedin.com/company/kds')
                ->required()
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