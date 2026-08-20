<?php

namespace App\Filament\Resources\Roles\Schemas;

use App\Models\Permission;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),

                Textarea::make('description')
                    ->rows(3),

                Select::make('status')
                    ->options([
                        'active'=>'Active',
                        'inactive'=>'Inactive',
                    ])
                    ->default('active')
                    ->required(),

                Toggle::make('is_system')
                    ->default(false),

                Section::make('Permissions')
                    ->description('Select which actions this role is allowed to perform.')
                    ->columnSpanFull()
                    ->schema([
                        CheckboxList::make('permissions')
                            ->relationship('permissions', 'name')
                            ->options(
                                Permission::query()
                                    ->orderBy('module')
                                    ->orderBy('name')
                                    ->get()
                                    ->mapWithKeys(fn ($permission) => [
                                        $permission->id => "{$permission->module} — {$permission->name}",
                                    ])
                            )
                            ->searchable()
                            ->bulkToggleable()
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),

            ]);
    }
}