<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentSectionSetting;
use App\Models\AgentCategory;
use App\Models\Agent;
use Illuminate\Http\JsonResponse;

class AgentSectionController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = AgentSectionSetting::first();

        $categories = AgentCategory::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($category) {
                $agents = Agent::where('category_id', $category->id)
                    ->where('is_active', true)
                    ->orderBy('order')
                    ->get()
                    ->map(function ($agent) {
                        return [
                            'id'          => $agent->id,
                            'name'        => $agent->name,
                            'description' => $agent->description,
                            'has_demo'    => $agent->has_demo,
                            'demo_url'    => $agent->demo_url,
                            'icon'        => $agent->icon,
                        ];
                    });

                return [
                    'id'          => $category->id,
                    'name'        => $category->name,
                    'slug'        => $category->slug,
                    'count'       => $agents->count(),
                    'agents'      => $agents,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'badge_text'         => $settings->badge_text ?? null,
                'heading'            => $settings->heading ?? null,
                'description'        => $settings->description ?? null,
                'cta_heading'        => $settings->cta_heading ?? null,
                'cta_description'    => $settings->cta_description ?? null,
                'cta_button_text'    => $settings->cta_button_text ?? null,
                'cta_button_url'     => $settings->cta_button_url ?? null,
                'total_agents'       => Agent::where('is_active', true)->count(),
                'categories'         => $categories,
            ],
        ]);
    }
}