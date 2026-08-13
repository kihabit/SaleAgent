<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BottomSlider;
use Illuminate\Http\Request;

class BottomSliderController extends Controller
{
    public function index(Request $request)
    {
        $query = BottomSlider::where('is_active', true);

        if ($request->has('slug')) {
            $query->where('page_slug', $request->slug);
        }

        $data = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}