<?php

namespace App\Filament\Resources\AiPoweredBusinessSections\Pages;

use App\Filament\Resources\AiPoweredBusinessSections\AiPoweredBusinessSectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAiPoweredBusinessSections extends ListRecords
{
    protected static string $resource = AiPoweredBusinessSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
