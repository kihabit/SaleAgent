<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterLink;
use Illuminate\Http\JsonResponse;

class FooterLinkController extends Controller
{
    /**
     * GET /api/footer-links
     * Returns active footer links grouped by column: agent_library, quick_links
     */
    public function index(): JsonResponse
    {
        $links = FooterLink::where('is_active', true)
            ->orderBy('order')
            ->get(['group', 'label', 'url', 'is_external']);

        $grouped = $links->groupBy('group');

        return response()->json([
            'success' => true,
            'data' => [
                'agent_library' => $grouped->get('agent_library', collect())->values(),
                'quick_links' => $grouped->get('quick_links', collect())->values(),
            ],
        ]);
    }
}