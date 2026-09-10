<?php

namespace App\Filament\Resources\CrewAcademySections\Pages;

use App\Filament\Resources\CrewAcademySections\CrewAcademySectionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCrewAcademySections extends ListRecords
{
    protected static string $resource = CrewAcademySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
