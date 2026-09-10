<?php

namespace App\Filament\Resources\AgentsActionSections\Pages;

use App\Filament\Resources\AgentsActionSections\AgentsActionSectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAgentsActionSection extends EditRecord
{
    protected static string $resource = AgentsActionSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
