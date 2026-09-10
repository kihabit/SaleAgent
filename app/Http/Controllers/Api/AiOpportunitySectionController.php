<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiOpportunitySection;
use Illuminate\Http\Request;

class AiOpportunitySectionController extends Controller
{
    public function index(Request $request)
    {
        $section = AiOpportunitySection::first();

        return response()->json([
            'success' => true,
            'data' => $section,
        ]);
    }
}