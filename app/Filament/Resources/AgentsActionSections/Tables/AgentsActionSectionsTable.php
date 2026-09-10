<?php

namespace App\Filament\Resources\AgentsActionSections\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AgentsActionSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('heading')
                    ->searchable(),

                ImageColumn::make('card_1_image')
                    ->label('Card 1'),
                TextColumn::make('card_1_title')
                    ->label('Card 1 Title'),

                ImageColumn::make('card_2_image')
                    ->label('Card 2'),
                TextColumn::make('card_2_title')
                    ->label('Card 2 Title'),

                ImageColumn::make('card_3_image')
                    ->label('Card 3'),
                TextColumn::make('card_3_title')
                    ->label('Card 3 Title'),

                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->recordActionsColumnLabel('Action')
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}