<?php

namespace App\Filament\Resources\ConsultationRequests\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\HtmlString;

class ConsultationRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('first_name')
                    ->searchable(),
                TextColumn::make('last_name')
                    ->searchable(),
                TextColumn::make('company_name')
                    ->searchable(),
                TextColumn::make('country')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email address')
                    ->searchable(),
                TextColumn::make('status')
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
                Action::make('viewMessage')
                    ->label('View Message')
                    ->icon('heroicon-o-eye')
                    ->color('gray')
                    ->modalHeading('Message')
                    ->modalContent(fn ($record) => new HtmlString('
                        <div class="p-4 space-y-3">
                            <div class="text-lg font-bold">Message</div>
                            <div><span class="font-semibold">Name:</span> ' . e($record->first_name . ' ' . $record->last_name) . '</div>
                            <div><span class="font-semibold">Email:</span> ' . e($record->email) . '</div>
                            <div><span class="font-semibold">Phone:</span> ' . e($record->phone) . '</div>
                            <div class="pt-2">
                                <span class="font-semibold">Message:</span>
                                <p class="whitespace-pre-wrap mt-1">' . e($record->message) . '</p>
                            </div>
                        </div>
                    '))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close'),
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