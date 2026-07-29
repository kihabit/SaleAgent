<?php

namespace App\Filament\Resources\MenuItems\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class MenuItemInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('label'),
                TextEntry::make('url'),
                TextEntry::make('icon')
                    ->placeholder('-'),
                TextEntry::make('description')
                    ->placeholder('-'),
                TextEntry::make('target'),
                TextEntry::make('order')
                    ->numeric(),
                TextEntry::make('parent_id')
                    ->numeric()
                    ->placeholder('-'),
                IconEntry::make('is_active')
                    ->boolean(),
                TextEntry::make('created_by')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('updated_by')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
