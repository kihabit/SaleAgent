<?php

namespace App\Filament\Resources\BottomStepSliders\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
class BottomStepSliderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('badge_text')
                ->label('Badge Text')
                ->placeholder('GET STARTED')
                ->maxLength(255),

            TextInput::make('heading')
                ->label('Heading')
                ->placeholder('Book Your KDS ERP Crew Demo in 4 Simple Steps')
                ->maxLength(255),

            TextInput::make('slug')
                ->label('Slug')
                ->placeholder('home-demo-steps')
                ->unique(ignoreRecord: true)
                ->maxLength(255),

            Textarea::make('description')
                ->label('Description')
                ->rows(3),

            Repeater::make('steps')
                ->label('Steps')
                ->schema([
                    TextInput::make('number')
                        ->label('Step Number')
                        ->placeholder('01')
                        ->required(),

                    TextInput::make('label')
                        ->label('Step Label')
                        ->placeholder('Step 1')
                        ->required(),

                    TextInput::make('heading')
                        ->label('Step Heading')
                        ->placeholder('Share Your Requirements')
                        ->required(),

                    Textarea::make('description')
                        ->label('Step Description')
                        ->rows(3)
                        ->required(),

                    FileUpload::make('image')
                    ->label('Step Image')
                    ->image()
                    ->disk('public')
                    ->directory('bottom-step-sliders')
                    ->required()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxSize(10240)
                    ->getUploadedFileNameForStorageUsing(
                        function ($file): string {
                            $originalName = pathinfo(
                                $file->getClientOriginalName(),
                                PATHINFO_FILENAME
                            );

                            $extension = $file->getClientOriginalExtension();

                            return Str::slug($originalName)
                                . '_'
                                . now('Asia/Kolkata')->format('Ymd_Hisv')
                                . '_IST_'
                                . Str::lower(Str::random(6))
                                . '.'
                                . $extension;
                        }
                    ),

                    TextInput::make('image_alt')
                        ->label('Image Alt Text')
                        ->maxLength(255),
                ])
                ->columns(2)
                ->defaultItems(0)
                ->addActionLabel('Add Step'),
        ]);
    }
}