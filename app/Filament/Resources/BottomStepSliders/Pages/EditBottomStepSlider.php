<?php

namespace App\Filament\Resources\BottomStepSliders\Pages;

use App\Filament\Resources\BottomStepSliders\BottomStepSliderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBottomStepSlider extends EditRecord
{
    protected static string $resource = BottomStepSliderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
