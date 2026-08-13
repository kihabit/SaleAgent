<?php

namespace App\Filament\Resources\CatalogueSettings\Pages;

use App\Filament\Resources\CatalogueSettings\CatalogueSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCatalogueSetting extends EditRecord
{
    protected static string $resource = CatalogueSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
