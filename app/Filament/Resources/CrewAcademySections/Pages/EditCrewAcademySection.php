<?php

namespace App\Filament\Resources\CrewAcademySections\Pages;

use App\Filament\Resources\CrewAcademySections\CrewAcademySectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditCrewAcademySection extends EditRecord
{
    protected static string $resource = CrewAcademySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
