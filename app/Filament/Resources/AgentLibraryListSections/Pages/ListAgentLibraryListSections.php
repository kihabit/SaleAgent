<?php

namespace App\Filament\Resources\AgentLibraryListSections\Pages;

use App\Filament\Resources\AgentLibraryListSections\AgentLibraryListSectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAgentLibraryListSections extends ListRecords
{
    protected static string $resource = AgentLibraryListSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
