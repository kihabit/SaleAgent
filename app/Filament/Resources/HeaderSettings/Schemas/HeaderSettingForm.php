<?php

namespace App\Filament\Resources\HeaderSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
class HeaderSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
FileUpload::make('logo_image')
    ->image()
    ->disk('public')
    ->directory('logos')
    ->label('Logo Image')
    ->visibility('public')
    ->fetchFileInformation(false)
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
            TextInput::make('logo_alt_text')
                ->label('Logo Alt Text')
                ->placeholder('KDS ERP Crew')
                ->maxLength(255),

            TextInput::make('logo_text')
                ->label('Logo Text')
                ->maxLength(255),

            TextInput::make('logo_link')
                ->label('Logo Link')
                ->default('/')
                ->maxLength(255),

            Toggle::make('is_sticky')
                ->label('Sticky Header')
                ->default(true),

            TextInput::make('cta_text')
                ->label('Button Text')
                ->placeholder('Schedule Your AI Audit')
                ->maxLength(255),

            TextInput::make('cta_url')
                ->label('Button URL')
                ->placeholder('/contact')
                ->maxLength(255),

            Select::make('cta_style')
                ->label('Button Style')
                ->options([
                    'primary'   => 'Primary',
                    'secondary' => 'Secondary',
                ])
                ->default('primary'),

            TextInput::make('meta_title')
                ->label('Meta Title')
                ->placeholder('KDS ERP Crew - Trusted AI-Powered ERP Software')
                ->maxLength(255),

            Textarea::make('meta_description')
                ->label('Meta Description')
                ->placeholder('Short description for Google search results...')
                ->maxLength(500)
                ->rows(3),

            Textarea::make('google_analytics_code')
                ->label('Google Analytics Code')
                ->placeholder('<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>...')
                ->rows(4),
        ]);
    }
}