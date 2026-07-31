<?php

namespace App\Filament\Resources\AgentSectionSettings\Pages;

use App\Filament\Resources\AgentSectionSettings\AgentSectionSettingResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAgentSectionSettings extends ListRecords
{
    protected static string $resource = AgentSectionSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
