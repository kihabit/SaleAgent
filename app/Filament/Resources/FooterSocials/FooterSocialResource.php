<?php

namespace App\Filament\Resources\FooterSocials;

use App\Filament\Concerns\HasPermissionAuthorization;
use App\Filament\Resources\FooterSocials\Pages\CreateFooterSocial;
use App\Filament\Resources\FooterSocials\Pages\EditFooterSocial;
use App\Filament\Resources\FooterSocials\Pages\ListFooterSocials;
use App\Filament\Resources\FooterSocials\Schemas\FooterSocialForm;
use App\Filament\Resources\FooterSocials\Tables\FooterSocialsTable;
use App\Models\FooterSocial;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class FooterSocialResource extends Resource
{
    use HasPermissionAuthorization;

    protected static ?string $model = FooterSocial::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|UnitEnum|null $navigationGroup = 'Appearance';
    protected static ?string $navigationLabel = 'Social Links';
    protected static ?string $modelLabel = 'Social Links';
    protected static ?string $pluralModelLabel = 'Social Links';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'platform';

    public static function form(Schema $schema): Schema
    {
        return FooterSocialForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FooterSocialsTable::configure($table);
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
            'index' => ListFooterSocials::route('/'),
            'create' => CreateFooterSocial::route('/create'),
            'edit' => EditFooterSocial::route('/{record}/edit'),
        ];
    }
}