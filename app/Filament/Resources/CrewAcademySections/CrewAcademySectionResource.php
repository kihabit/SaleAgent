<?php

namespace App\Filament\Resources\CrewAcademySections;

use App\Filament\Resources\CrewAcademySections\Pages\CreateCrewAcademySection;
use App\Filament\Resources\CrewAcademySections\Pages\EditCrewAcademySection;
use App\Filament\Resources\CrewAcademySections\Pages\ListCrewAcademySections;
use App\Filament\Resources\CrewAcademySections\Schemas\CrewAcademySectionForm;
use App\Filament\Resources\CrewAcademySections\Tables\CrewAcademySectionsTable;
use App\Models\CrewAcademySection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class CrewAcademySectionResource extends Resource
{
    protected static ?string $model = CrewAcademySection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Agent Library';

    protected static ?string $navigationLabel = 'Crew Academy Section';

    protected static ?string $recordTitleAttribute = 'heading';

    public static function form(Schema $schema): Schema
    {
        return CrewAcademySectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CrewAcademySectionsTable::configure($table);
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
            'index' => ListCrewAcademySections::route('/'),
            'create' => CreateCrewAcademySection::route('/create'),
            'edit' => EditCrewAcademySection::route('/{record}/edit'),
        ];
    }
}