<?php

namespace App\Filament\Resources\BottomSliders;

use App\Filament\Resources\BottomSliders\Pages\CreateBottomSlider;
use App\Filament\Resources\BottomSliders\Pages\EditBottomSlider;
use App\Filament\Resources\BottomSliders\Pages\ListBottomSliders;
use App\Filament\Resources\BottomSliders\Schemas\BottomSliderForm;
use App\Filament\Resources\BottomSliders\Tables\BottomSlidersTable;
use App\Models\BottomSlider;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BottomSliderResource extends Resource
{
    protected static ?string $model = BottomSlider::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'heading_normal';

    protected static string|UnitEnum|null $navigationGroup = 'Content';

    public static function form(Schema $schema): Schema
    {
        return BottomSliderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BottomSlidersTable::configure($table);
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
            'index' => ListBottomSliders::route('/'),
            'create' => CreateBottomSlider::route('/create'),
            'edit' => EditBottomSlider::route('/{record}/edit'),
        ];
    }
}