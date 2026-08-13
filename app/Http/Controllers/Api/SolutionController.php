<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Solution;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
   public function index()
{
    $solutions = Solution::where('is_active', true)
        ->orderBy('sort_order', 'asc')
        ->get();

    return response()->json([
        'success' => true,
        'data' => $solutions,
    ]);
}
}