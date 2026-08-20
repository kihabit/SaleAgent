<?php

namespace App\Filament\Resources\CatalogueSettings;

use App\Filament\Concerns\HasPermissionAuthorization;
use App\Filament\Resources\CatalogueSettings\Pages\CreateCatalogueSetting;
use App\Filament\Resources\CatalogueSettings\Pages\EditCatalogueSetting;
use App\Filament\Resources\CatalogueSettings\Pages\ListCatalogueSettings;
use App\Filament\Resources\CatalogueSettings\Schemas\CatalogueSettingForm;
use App\Filament\Resources\CatalogueSettings\Tables\CatalogueSettingsTable;
use App\Models\CatalogueSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class CatalogueSettingResource extends Resource
{
    use HasPermissionAuthorization;

    protected static ?string $model = CatalogueSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return CatalogueSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CatalogueSettingsTable::configure($table);
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
            'index' => ListCatalogueSettings::route('/'),
            'create' => CreateCatalogueSetting::route('/create'),
            'edit' => EditCatalogueSetting::route('/{record}/edit'),
        ];
    }
}