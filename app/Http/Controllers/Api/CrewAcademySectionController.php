<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CrewAcademySection;
use Illuminate\Http\Request;

class CrewAcademySectionController extends Controller
{
    public function index(Request $request)
    {
        $section = CrewAcademySection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}