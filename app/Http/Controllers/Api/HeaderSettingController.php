<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeaderSetting;
use Illuminate\Http\JsonResponse;

class HeaderSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $header = HeaderSetting::first();

        if (!$header) {
            return response()->json([
                'success' => false,
                'message' => 'Header settings not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'logo_image'     => $header->logo_image ? asset('storage/' . $header->logo_image) : null,
                'logo_alt_text'  => $header->logo_alt_text,
                'logo_text'      => $header->logo_text,
                'logo_link'      => $header->logo_link,
                'is_sticky'      => $header->is_sticky,
                'cta_text'       => $header->cta_text,
                'cta_url'        => $header->cta_url,
                'cta_style'      => $header->cta_style,
            ],
        ]);
    }
}