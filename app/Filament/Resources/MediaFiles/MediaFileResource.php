<?php

namespace App\Filament\Resources\MediaFiles;

use App\Filament\Resources\MediaFiles\Pages\CreateMediaFile;
use App\Filament\Resources\MediaFiles\Pages\EditMediaFile;
use App\Filament\Resources\MediaFiles\Pages\ListMediaFiles;
use App\Filament\Resources\MediaFiles\Schemas\MediaFileForm;
use App\Filament\Resources\MediaFiles\Tables\MediaFilesTable;
use App\Models\MediaFile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class MediaFileResource extends Resource
{
    protected static ?string $model = MediaFile::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return MediaFileForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MediaFilesTable::configure($table);
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
            'index' => ListMediaFiles::route('/'),
            'create' => CreateMediaFile::route('/create'),
            'edit' => EditMediaFile::route('/{record}/edit'),
        ];
    }
}
