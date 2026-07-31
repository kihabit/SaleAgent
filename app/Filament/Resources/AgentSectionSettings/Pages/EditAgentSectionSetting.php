<?php

namespace App\Filament\Resources\AgentSectionSettings\Pages;

use App\Filament\Resources\AgentSectionSettings\AgentSectionSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAgentSectionSetting extends EditRecord
{
    protected static string $resource = AgentSectionSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
