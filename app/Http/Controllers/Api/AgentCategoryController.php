<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentCategory;
use Illuminate\Http\Request;

class AgentCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = AgentCategory::query();

     
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        } else {
            $query->where('is_active', 1); 
        }

        $categories = $query->orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}