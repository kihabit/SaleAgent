<?php

namespace App\Filament\Resources\BottomStepSliders\Pages;

use App\Filament\Resources\BottomStepSliders\BottomStepSliderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBottomStepSliders extends ListRecords
{
    protected static string $resource = BottomStepSliderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
