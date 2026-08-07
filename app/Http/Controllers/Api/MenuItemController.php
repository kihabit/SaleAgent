<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\JsonResponse;

class MenuItemController extends Controller
{
    public function index(): JsonResponse
    {
        $menus = MenuItem::whereNull('parent_id')
            ->where('is_active', true)
            ->orderBy('order')
            ->with(['children' => function ($query) {
                $query->where('is_active', true)->orderBy('order');
            }])
            ->get();

        $data = $menus->map(function ($menu) {
            return [
                'id'          => $menu->id,
                'label'       => $menu->label,
                'url'         => $menu->url,
                'icon'        => $menu->icon,
                'description' => $menu->description,
                'target'      => $menu->target,
                'children'    => $menu->children->map(function ($child) {
                    return [
                        'id'          => $child->id,
                        'label'       => $child->label,
                        'url'         => $child->url,
                        'icon'        => $child->icon,
                        'description' => $child->description,
                        'target'      => $child->target,
                    ];
                }),
            ];
        });

        return response()->json([
            'success' => true,
            'data'    => $data,
        ]);
    }
}