<?php

namespace App\Filament\Resources\MenuItems;

use App\Filament\Resources\MenuItems\Pages;
use App\Filament\Resources\MenuItems\Tables\MenuItemsTable;
use App\Models\MenuItem;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class MenuItemResource extends Resource
{
    protected static ?string $model = MenuItem::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bars-3';
    protected static string|\UnitEnum|null $navigationGroup = 'Appearance';
    protected static ?string $navigationLabel = 'Menus';
    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('label')
                ->required()
                ->maxLength(255),

            TextInput::make('url')
                ->required()
                ->maxLength(255)
                ->placeholder('/about-us'),

            TextInput::make('icon')
                ->placeholder('heroicon-o-home')
                ->helperText('Filament heroicon name, e.g. heroicon-o-home'),

            Textarea::make('description')
                ->rows(2)
                ->placeholder('Short text for dropdown item'),

            Select::make('target')
                ->options([
                    '_self'  => 'Same Tab',
                    '_blank' => 'New Tab',
                ])
                ->default('_self')
                ->required(),

            Select::make('parent_id')
                ->label('Parent Menu (for dropdown)')
                ->relationship('parent', 'label')
                ->searchable()
                ->preload()
                ->nullable(),

            TextInput::make('order')
                ->numeric()
                ->default(0),

            Toggle::make('is_active')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return MenuItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListMenuItems::route('/'),
            'create' => Pages\CreateMenuItem::route('/create'),
            'edit'   => Pages\EditMenuItem::route('/{record}/edit'),
        ];
    }
    public static function canViewAny(): bool
    {
        return true;
    }
}