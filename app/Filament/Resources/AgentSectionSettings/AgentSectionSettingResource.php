<?php

namespace App\Filament\Resources\AgentSectionSettings;

use App\Filament\Resources\AgentSectionSettings\Pages\CreateAgentSectionSetting;
use App\Filament\Resources\AgentSectionSettings\Pages\EditAgentSectionSetting;
use App\Filament\Resources\AgentSectionSettings\Pages\ListAgentSectionSettings;
use App\Filament\Resources\AgentSectionSettings\Schemas\AgentSectionSettingForm;
use App\Filament\Resources\AgentSectionSettings\Tables\AgentSectionSettingsTable;
use App\Models\AgentSectionSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AgentSectionSettingResource extends Resource
{
    protected static ?string $model = AgentSectionSetting::class;
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
protected static ?int $navigationSort = 2;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return AgentSectionSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AgentSectionSettingsTable::configure($table);
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
            'index' => ListAgentSectionSettings::route('/'),
            'create' => CreateAgentSectionSetting::route('/create'),
            'edit' => EditAgentSectionSetting::route('/{record}/edit'),
        ];
    }
}
