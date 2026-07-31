<?php

namespace App\Filament\Resources\AgentSectionSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class AgentSectionSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('badge_text')
                ->label('Badge Text')
                ->placeholder('AGENT HIGHLIGHTS')
                ->maxLength(255),

            TextInput::make('heading')
                ->label('Heading')
                ->placeholder('Experience AI Agents in Action')
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(3),

            TextInput::make('cta_heading')
                ->label('Bottom CTA Heading')
                ->placeholder('Need something more specialised?')
                ->maxLength(255),

            Textarea::make('cta_description')
                ->label('Bottom CTA Description')
                ->rows(2),

            TextInput::make('cta_button_text')
                ->label('CTA Button Text')
                ->placeholder('Browse Full Catalogue')
                ->maxLength(255),

            TextInput::make('cta_button_url')
                ->label('CTA Button URL')
                ->placeholder('/catalogue')
                ->maxLength(255),
        ]);
    }
}