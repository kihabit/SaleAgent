<?php

namespace App\Filament\Resources\BottomStepSliders;

use App\Filament\Resources\BottomStepSliders\Pages\CreateBottomStepSlider;
use App\Filament\Resources\BottomStepSliders\Pages\EditBottomStepSlider;
use App\Filament\Resources\BottomStepSliders\Pages\ListBottomStepSliders;
use App\Filament\Resources\BottomStepSliders\Schemas\BottomStepSliderForm;
use App\Filament\Resources\BottomStepSliders\Tables\BottomStepSlidersTable;
use App\Models\BottomStepSlider;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BottomStepSliderResource extends Resource
{
    protected static ?string $model = BottomStepSlider::class;
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
protected static ?int $navigationSort = 6;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return BottomStepSliderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BottomStepSlidersTable::configure($table);
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
            'index' => ListBottomStepSliders::route('/'),
            'create' => CreateBottomStepSlider::route('/create'),
            'edit' => EditBottomStepSlider::route('/{record}/edit'),
        ];
    }
}
