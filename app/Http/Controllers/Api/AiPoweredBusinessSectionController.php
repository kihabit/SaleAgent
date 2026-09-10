<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiPoweredBusinessSection;
use Illuminate\Http\Request;

class AiPoweredBusinessSectionController extends Controller
{
    public function index(Request $request)
    {
        $section = AiPoweredBusinessSection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}