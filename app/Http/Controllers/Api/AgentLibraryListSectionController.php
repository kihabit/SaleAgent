<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentLibraryListSection;
use Illuminate\Http\Request;

class AgentLibraryListSectionController extends Controller
{
    public function index(Request $request)
    {
        $section = AgentLibraryListSection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}