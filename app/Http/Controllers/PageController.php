<?php

namespace App\Http\Controllers;

use App\Models\Page;

class PageController extends Controller
{

    public function show($slug)
    {

        $page = Page::where('slug', $slug)
            ->firstOrFail();


        $page->increment('views');


        return view(
            'pages.show',
            compact('page')
        );

    }

}