<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentsActionSection;
use Illuminate\Http\Request;

class AgentsActionSectionController extends Controller
{
    public function index(Request $request)
    {
        $section = AgentsActionSection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}