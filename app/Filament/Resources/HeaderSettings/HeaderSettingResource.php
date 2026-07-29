<?php

namespace App\Filament\Resources\HeaderSettings;

use App\Filament\Resources\HeaderSettings\Pages\CreateHeaderSetting;
use App\Filament\Resources\HeaderSettings\Pages\EditHeaderSetting;
use App\Filament\Resources\HeaderSettings\Pages\ListHeaderSettings;
use App\Filament\Resources\HeaderSettings\Schemas\HeaderSettingForm;
use App\Filament\Resources\HeaderSettings\Tables\HeaderSettingsTable;
use App\Models\HeaderSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class HeaderSettingResource extends Resource
{
    protected static ?string $model = HeaderSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Appearance';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return HeaderSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HeaderSettingsTable::configure($table);
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
            'index' => ListHeaderSettings::route('/'),
            'create' => CreateHeaderSetting::route('/create'),
            'edit' => EditHeaderSetting::route('/{record}/edit'),
        ];
    }
}