<?php

namespace App\Filament\Resources\AgentLibraryListSections\Pages;

use App\Filament\Resources\AgentLibraryListSections\AgentLibraryListSectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAgentLibraryListSection extends EditRecord
{
    protected static string $resource = AgentLibraryListSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
