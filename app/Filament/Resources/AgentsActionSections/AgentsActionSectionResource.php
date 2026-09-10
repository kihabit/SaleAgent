<?php

namespace App\Filament\Resources\AgentsActionSections;

use App\Filament\Resources\AgentsActionSections\Pages\CreateAgentsActionSection;
use App\Filament\Resources\AgentsActionSections\Pages\EditAgentsActionSection;
use App\Filament\Resources\AgentsActionSections\Pages\ListAgentsActionSections;
use App\Filament\Resources\AgentsActionSections\Schemas\AgentsActionSectionForm;
use App\Filament\Resources\AgentsActionSections\Tables\AgentsActionSectionsTable;
use App\Models\AgentsActionSection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AgentsActionSectionResource extends Resource
{
    protected static ?string $model = AgentsActionSection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Agents in Action';

    protected static ?string $recordTitleAttribute = 'heading';

    public static function form(Schema $schema): Schema
    {
        return AgentsActionSectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AgentsActionSectionsTable::configure($table);
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
            'index' => ListAgentsActionSections::route('/'),
            'create' => CreateAgentsActionSection::route('/create'),
            'edit' => EditAgentsActionSection::route('/{record}/edit'),
        ];
    }
}