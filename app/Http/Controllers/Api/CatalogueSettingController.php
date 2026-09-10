<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CatalogueSetting;
use Illuminate\Http\JsonResponse;

class CatalogueSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = CatalogueSetting::first();

        if (!$settings) {
            return response()->json([
                'success' => false,
                'message' => 'Catalogue settings not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'badge_text'       => $settings->badge_text,
                'heading'          => $settings->heading,
                'slug'             => $settings->slug,
                'description'      => $settings->description,
                'hero_image'       => $settings->hero_image,
                'hero_image_alt'   => $settings->hero_image_alt,
                'feature_1_icon'   => $settings->feature_1_icon,
                'feature_1_title'  => $settings->feature_1_title,
                'feature_2_icon'   => $settings->feature_2_icon,
                'feature_2_title'  => $settings->feature_2_title,
                'feature_3_icon'   => $settings->feature_3_icon,
                'feature_3_title'  => $settings->feature_3_title,
                'notice_text'      => $settings->notice_text,
                'notice_link_text' => $settings->notice_link_text,
                'notice_link_url'  => $settings->notice_link_url,
            ],
        ]);
    }
}