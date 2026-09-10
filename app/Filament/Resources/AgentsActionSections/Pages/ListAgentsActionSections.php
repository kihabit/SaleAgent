<?php

namespace App\Filament\Resources\AgentsActionSections\Pages;

use App\Filament\Resources\AgentsActionSections\AgentsActionSectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAgentsActionSections extends ListRecords
{
    protected static string $resource = AgentsActionSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
