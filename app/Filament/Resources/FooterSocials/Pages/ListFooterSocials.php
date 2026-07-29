<?php

namespace App\Filament\Resources\FooterSocials\Pages;

use App\Filament\Resources\FooterSocials\FooterSocialResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFooterSocials extends ListRecords
{
    protected static string $resource = FooterSocialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
