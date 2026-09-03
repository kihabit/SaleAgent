<?php

namespace App\Filament\Resources\HeaderSettings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HeaderSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('logo_image')
                    ->disk('public'),
                TextColumn::make('logo_text')
                    ->searchable(),
                TextColumn::make('logo_link')
                    ->searchable(),
                IconColumn::make('is_sticky')
                    ->boolean(),
                TextColumn::make('cta_text')
                    ->searchable(),
                TextColumn::make('cta_url')
                    ->searchable(),
                TextColumn::make('cta_style')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
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