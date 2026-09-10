<?php

namespace App\Filament\Resources\AiPoweredBusinessSections\Pages;

use App\Filament\Resources\AiPoweredBusinessSections\AiPoweredBusinessSectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAiPoweredBusinessSection extends EditRecord
{
    protected static string $resource = AiPoweredBusinessSectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
