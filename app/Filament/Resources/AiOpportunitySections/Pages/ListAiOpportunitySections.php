<?php

namespace App\Filament\Resources\AiOpportunitySections\Pages;

use App\Filament\Resources\AiOpportunitySections\AiOpportunitySectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAiOpportunitySections extends ListRecords
{
    protected static string $resource = AiOpportunitySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
