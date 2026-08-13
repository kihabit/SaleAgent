<?php

namespace App\Filament\Resources\BottomSliders\Pages;

use App\Filament\Resources\BottomSliders\BottomSliderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListBottomSliders extends ListRecords
{
    protected static string $resource = BottomSliderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
