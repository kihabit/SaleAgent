<?php

namespace App\Filament\Resources\BottomSliders\Pages;

use App\Filament\Resources\BottomSliders\BottomSliderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBottomSlider extends EditRecord
{
    protected static string $resource = BottomSliderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
