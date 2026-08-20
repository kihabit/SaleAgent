<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $modules = [
            'Users'                 => ['users', 'Users'],
            'Pages'                 => ['pages', 'Pages'],
            'AgentCategory'         => ['agent_categories', 'Agent Categories'],
            'Agent'                 => ['agents', 'Agents'],
            'AgentHighlight'        => ['agent_highlights', 'Agent Highlights'],
            'AgentSectionSetting'   => ['agent_section_settings', 'Agent Section Settings'],
            'BottomSlider'          => ['bottom_sliders', 'Bottom Sliders'],
            'BottomStepSlider'      => ['bottom_step_sliders', 'Bottom Step Sliders'],
            'CatalogueSetting'      => ['catalogue_settings', 'Catalogue Settings'],
            'ConsultationRequest'   => ['consultation_requests', 'Consultation Requests'],
            'FooterSetting'         => ['footer_settings', 'Footer Settings'],
            'FooterSocial'          => ['footer_socials', 'Footer Socials'],
            'HeaderSetting'         => ['header_settings', 'Header Settings'],
            'HeroSlide'             => ['hero_slides', 'Hero Slides'],
            'MediaFile'             => ['media_files', 'Media Files'],
            'Solution'              => ['solutions', 'Solutions'],
        ];

        $actions = [
            'view'   => 'View',
            'create' => 'Create',
            'edit'   => 'Edit',
            'delete' => 'Delete',
        ];

        foreach ($modules as $moduleLabel => [$slugPrefix, $readableName]) {
            foreach ($actions as $slugSuffix => $actionLabel) {
                Permission::firstOrCreate(
                    ['slug' => "{$slugPrefix}.{$slugSuffix}"],
                    [
                        'name'   => "{$actionLabel} {$readableName}",
                        'module' => $moduleLabel,
                    ]
                );
            }
        }
    }
}