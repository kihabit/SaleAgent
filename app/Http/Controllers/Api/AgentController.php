<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index(Request $request)
    {
        $query = Agent::with('category');

        // सिर्फ active agents चाहिए तो
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        } else {
            $query->where('is_active', 1); // default: सिर्फ active
        }

        // optional: किसी particular category के agents चाहिए तो
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $agents = $query->orderBy('order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $agents,
        ]);
    }
}