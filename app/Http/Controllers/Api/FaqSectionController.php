<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FaqSection;
use Illuminate\Http\Request;

class FaqSectionController extends Controller
{
    public function index(Request $request)
    {
        $section = FaqSection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}