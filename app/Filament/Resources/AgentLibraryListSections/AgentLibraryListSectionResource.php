<?php

namespace App\Filament\Resources\AgentLibraryListSections;

use App\Filament\Resources\AgentLibraryListSections\Pages\CreateAgentLibraryListSection;
use App\Filament\Resources\AgentLibraryListSections\Pages\EditAgentLibraryListSection;
use App\Filament\Resources\AgentLibraryListSections\Pages\ListAgentLibraryListSections;
use App\Filament\Resources\AgentLibraryListSections\Schemas\AgentLibraryListSectionForm;
use App\Filament\Resources\AgentLibraryListSections\Tables\AgentLibraryListSectionsTable;
use App\Models\AgentLibraryListSection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AgentLibraryListSectionResource extends Resource
{
    protected static ?string $model = AgentLibraryListSection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?string $navigationLabel = 'Agent Library List Section';

    protected static ?string $recordTitleAttribute = 'heading';

    public static function form(Schema $schema): Schema
    {
        return AgentLibraryListSectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AgentLibraryListSectionsTable::configure($table);
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
            'index' => ListAgentLibraryListSections::route('/'),
            'create' => CreateAgentLibraryListSection::route('/create'),
            'edit' => EditAgentLibraryListSection::route('/{record}/edit'),
        ];
    }
}