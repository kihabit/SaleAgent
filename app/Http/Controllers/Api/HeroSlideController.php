<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;

class HeroSlideController extends Controller
{
    public function index(): JsonResponse
    {
        $slides = HeroSlide::where('is_active', true)
            ->orderBy('order')
            ->get();

        $data = $slides->map(function ($slide) {
            return [
                'id'             => $slide->id,
                'heading'        => $slide->heading,
                'description'    => $slide->description,
                'image'          => $slide->image ? asset('storage/' . $slide->image) : null,
                'image_alt_text' => $slide->image_alt_text,
                'btn1_text'      => $slide->btn1_text,
                'btn1_url'       => $slide->btn1_url,
                'btn2_text'      => $slide->btn2_text,
                'btn2_url'       => $slide->btn2_url,
                'btn3_text'      => $slide->btn3_text,
                'btn3_url'       => $slide->btn3_url,
                'stats'          => $slide->stats,
                'order'          => $slide->order,
            ];
        });

        return response()->json([
            'success' => true,
            'data'    => $data,
        ]);
    }
}