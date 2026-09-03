<?php

namespace App\Filament\Resources\MediaFiles\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MediaFilesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('path')
                    ->label('Preview')
                    ->disk('public')
                    ->square(),

                TextColumn::make('name')
                    ->searchable()
                    ->limit(15)
                    ->tooltip(fn ($state) => $state),

                TextColumn::make('path')
                    ->label('URL')
                    ->formatStateUsing(fn ($state) => asset('storage/' . $state))
                    ->copyable()
                    ->copyMessage('Link copied!')
                    ->wrap(),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('d M Y')
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