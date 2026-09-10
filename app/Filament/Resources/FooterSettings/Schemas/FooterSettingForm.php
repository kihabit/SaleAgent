<?php

namespace App\Filament\Resources\FooterSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FooterSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            FileUpload::make('logo_image')
                ->image()
                ->disk('public')
                ->directory('logos')
                ->label('Footer Logo'),

            TextInput::make('logo_alt_text')
                ->label('Logo Alt Text')
                ->placeholder('KDS ERP Crew')
                ->maxLength(255),

            TextInput::make('about_heading')
                ->label('About Heading')
                ->placeholder('About Key Dynamics Solutions (KDS)')
                ->maxLength(255),

            Textarea::make('about_text')
                ->label('About Text')
                ->rows(4),

            TextInput::make('contact_heading')
                ->label('Contact Section Heading')
                ->placeholder('Contact details')
                ->maxLength(255),

            Repeater::make('contact_addresses')
                ->label('Contact Addresses')
                ->schema([
                    Textarea::make('address')
                        ->label('Address')
                        ->rows(2)
                        ->required(),
                ])
                ->defaultItems(1)
                ->maxItems(4)
                ->addActionLabel('Add Address')
                ->collapsible()
                ->itemLabel(fn (array $state): ?string => $state['address'] ?? null),

            TextInput::make('contact_email')
                ->label('Contact Email')
                ->email()
                ->placeholder('Sales@keydynamicssolutions.com')
                ->maxLength(255),

            TextInput::make('contact_phone')
                ->label('Contact Phone')
                ->tel()
                ->placeholder('+91 9217719348')
                ->maxLength(255),

            TextInput::make('copyright_text')
                ->label('Copyright Text')
                ->placeholder('© 2026 Key Dynamics Solutions Pvt. Ltd. All Rights Reserved.')
                ->maxLength(255),
        ]);
    }
}