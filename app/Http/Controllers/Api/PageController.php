<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;

class PageController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)->first();

        if (!$page) {
            return response()->json([
                'success' => false,
                'message' => 'Page not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'title'    => $page->title,
                'subtitle' => $page->subtitle,
                'excerpt'  => $page->excerpt,
                'content'  => $page->content,
            ],
        ]);
    }
}