<?php

namespace App\Filament\Resources\AiOpportunitySections\Pages;

use App\Filament\Resources\AiOpportunitySections\AiOpportunitySectionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAiOpportunitySection extends EditRecord
{
    protected static string $resource = AiOpportunitySectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
