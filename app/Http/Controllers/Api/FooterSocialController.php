<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterSocial;

class FooterSocialController extends Controller
{
    public function index()
    {
        $socials = FooterSocial::where('is_active', true)
            ->orderBy('order')
            ->get(['platform', 'icon', 'url']);

        return response()->json([
            'success' => true,
            'data' => $socials,
        ]);
    }
}