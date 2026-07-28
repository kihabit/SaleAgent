<?php

namespace App\Filament\Resources\Pages\Pages;

use App\Filament\Resources\Pages\PageResource;

use Filament\Resources\Pages\ListRecords;

use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ForceDeleteAction;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ForceDeleteBulkAction;

use Filament\Tables\Filters\TrashedFilter;


class ListPages extends ListRecords
{
    protected static string $resource = PageResource::class;


    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }


    protected function getTableFilters(): array
    {
        return [
            TrashedFilter::make(),
        ];
    }


    protected function getTableActions(): array
    {
        return [

            DeleteAction::make(),

            RestoreAction::make(),

            ForceDeleteAction::make(),

        ];
    }


    protected function getTableBulkActions(): array
    {
        return [

            BulkActionGroup::make([

                DeleteBulkAction::make(),

                RestoreBulkAction::make(),

                ForceDeleteBulkAction::make(),

            ]),

        ];
    }
}