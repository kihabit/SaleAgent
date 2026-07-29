<?php

namespace App\Filament\Resources\FooterSocials\Pages;

use App\Filament\Resources\FooterSocials\FooterSocialResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditFooterSocial extends EditRecord
{
    protected static string $resource = FooterSocialResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
