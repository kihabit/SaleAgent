<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;

use Illuminate\Support\Str;


class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Tabs::make('Page')

                    ->tabs([

                        Tab::make('General & Content')

                            ->schema([

                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(
                                        function (
                                            Set $set,
                                            Get $get,
                                            ?string $state
                                        ) {

                                            if (blank($get('slug'))) {

                                                $set(
                                                    'slug',
                                                    Str::slug($state)
                                                );

                                            }
                                        }
                                    ),


                                TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true),


                                TextInput::make('subtitle')
                                    ->maxLength(255),


                                Textarea::make('excerpt')
                                    ->maxLength(1000),


                                Textarea::make('content')
                                    ->columnSpanFull()
                                    ->rows(30)
                                    ->extraInputAttributes(['style' => 'font-family: monospace; font-size: 13px;']),

                            ]),

                    ])

            ]);
    }
}