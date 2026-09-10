<?php

namespace App\Filament\Resources\AiPoweredBusinessSections\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AiPoweredBusinessSectionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('heading_black')
                    ->label('Heading (Black)')
                    ->searchable(),
                TextColumn::make('heading_colored')
                    ->label('Heading (Colored)')
                    ->searchable(),
                TextColumn::make('feature_1_title')
                    ->label('Feature 1'),
                TextColumn::make('feature_2_title')
                    ->label('Feature 2'),
                TextColumn::make('feature_3_title')
                    ->label('Feature 3'),
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