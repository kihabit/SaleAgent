<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BottomStepSlider;
use Illuminate\Http\JsonResponse;

class BottomStepSliderController extends Controller
{
    public function index(): JsonResponse
    {
        $slider = BottomStepSlider::first();

        if (!$slider) {
            return response()->json([
                'success' => false,
                'message' => 'Bottom step slider not found',
            ], 404);
        }

        $steps = collect($slider->steps ?? [])->map(function ($step) {
            return [
                'number'      => $step['number'] ?? '',
                'label'       => $step['label'] ?? '',
                'heading'     => $step['heading'] ?? '',
                'description' => $step['description'] ?? '',
                'image'       => !empty($step['image']) ? asset('storage/' . $step['image']) : null,
                'image_alt'   => $step['image_alt'] ?? '',
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'badge_text'  => $slider->badge_text,
                'heading'     => $slider->heading,
                'slug'        => $slider->slug,
                'description' => $slider->description,
                'steps'       => $steps,
            ],
        ]);
    }
}