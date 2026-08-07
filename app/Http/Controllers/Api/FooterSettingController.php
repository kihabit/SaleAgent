<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use App\Models\FooterSocial;
use Illuminate\Http\JsonResponse;

class FooterSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $footer = FooterSetting::first();

        if (!$footer) {
            return response()->json([
                'success' => false,
                'message' => 'Footer settings not found',
            ], 404);
        }

        $socials = FooterSocial::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($social) {
                return [
                    'platform' => $social->platform,
                    'icon'     => $social->icon,
                    'url'      => $social->url,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'logo_image'         => $footer->logo_image ? asset('storage/' . $footer->logo_image) : null,
                'logo_alt_text'      => $footer->logo_alt_text,
                'about_heading'      => $footer->about_heading,
                'about_text'         => $footer->about_text,
                'info_heading'       => $footer->info_heading,
                'info_text'          => $footer->info_text,
                'info_link_text'     => $footer->info_link_text,
                'info_link_url'      => $footer->info_link_url,
                'connect_heading'    => $footer->connect_heading,
                'connect_text'       => $footer->connect_text,
                'copyright_text'     => $footer->copyright_text,
                'socials'            => $socials,
            ],
        ]);
    }
}