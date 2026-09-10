<?php

namespace App\Filament\Resources\AiPoweredBusinessSections;

use App\Filament\Resources\AiPoweredBusinessSections\Pages\CreateAiPoweredBusinessSection;
use App\Filament\Resources\AiPoweredBusinessSections\Pages\EditAiPoweredBusinessSection;
use App\Filament\Resources\AiPoweredBusinessSections\Pages\ListAiPoweredBusinessSections;
use App\Filament\Resources\AiPoweredBusinessSections\Schemas\AiPoweredBusinessSectionForm;
use App\Filament\Resources\AiPoweredBusinessSections\Tables\AiPoweredBusinessSectionsTable;
use App\Models\AiPoweredBusinessSection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AiPoweredBusinessSectionResource extends Resource
{
    protected static ?string $model = AiPoweredBusinessSection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
    
protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static ?string $recordTitleAttribute = 'heading_colored';

    public static function form(Schema $schema): Schema
    {
        return AiPoweredBusinessSectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AiPoweredBusinessSectionsTable::configure($table);
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
            'index' => ListAiPoweredBusinessSections::route('/'),
            'create' => CreateAiPoweredBusinessSection::route('/create'),
            'edit' => EditAiPoweredBusinessSection::route('/{record}/edit'),
        ];
    }
}
