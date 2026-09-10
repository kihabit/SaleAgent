<?php

namespace App\Filament\Resources\AiOpportunitySections;

use App\Filament\Resources\AiOpportunitySections\Pages\CreateAiOpportunitySection;
use App\Filament\Resources\AiOpportunitySections\Pages\EditAiOpportunitySection;
use App\Filament\Resources\AiOpportunitySections\Pages\ListAiOpportunitySections;
use App\Filament\Resources\AiOpportunitySections\Schemas\AiOpportunitySectionForm;
use App\Filament\Resources\AiOpportunitySections\Tables\AiOpportunitySectionsTable;
use App\Models\AiOpportunitySection;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AiOpportunitySectionResource extends Resource
{
    protected static ?string $model = AiOpportunitySection::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Agent Library';

    protected static ?string $navigationLabel = 'AI Opportunity Section';

    protected static ?string $recordTitleAttribute = 'heading';

    public static function form(Schema $schema): Schema
    {
        return AiOpportunitySectionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AiOpportunitySectionsTable::configure($table);
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
            'index' => ListAiOpportunitySections::route('/'),
            'create' => CreateAiOpportunitySection::route('/create'),
            'edit' => EditAiOpportunitySection::route('/{record}/edit'),
        ];
    }
}