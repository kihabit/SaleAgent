<?php

namespace App\Filament\Resources\CatalogueSettings\Pages;

use App\Filament\Resources\CatalogueSettings\CatalogueSettingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCatalogueSettings extends ListRecords
{
    protected static string $resource = CatalogueSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
