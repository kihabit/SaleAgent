<?php

use Illuminate\Support\Facades\Route;
use App\Models\Page;

/*
|--------------------------------------------------------------------------
| Frontend Home
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->file(
        base_path('frontend/index.html')
    );
});

/*
|--------------------------------------------------------------------------
| Frontend Pages
|--------------------------------------------------------------------------
*/

use App\Models\CatalogueSetting;

Route::get('/agent-library', function () {
    $catalogue = CatalogueSetting::first();

    return view('agent-library', compact('catalogue'));
});

/*
|--------------------------------------------------------------------------
| Frontend Assets (CSS, JS, Images) - with correct MIME types
|--------------------------------------------------------------------------
*/

Route::get('/frontend/{path}', function ($path) {

    $file = base_path('frontend/' . $path);

    if (!is_file($file)) {
        abort(404);
    }

    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));

    $mimeTypes = [
        'css'   => 'text/css',
        'js'    => 'application/javascript',
        'png'   => 'image/png',
        'jpg'   => 'image/jpeg',
        'jpeg'  => 'image/jpeg',
        'gif'   => 'image/gif',
        'svg'   => 'image/svg+xml',
        'webp'  => 'image/webp',
        'ico'   => 'image/x-icon',
        'woff'  => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf'   => 'font/ttf',
    ];

    $mime = $mimeTypes[$extension] ?? 'application/octet-stream';

    return response()->file($file, [
        'Content-Type' => $mime,
    ]);

})->where('path', '.*');

/*
|--------------------------------------------------------------------------
| Dynamic CMS Pages (About Us, etc.)
|--------------------------------------------------------------------------
*/

Route::get('/{slug}', function ($slug) {
    $page = Page::where('slug', $slug)->firstOrFail();
    $page->increment('views');

    return view('pages.show', compact('page'));
})->where('slug', '[a-zA-Z0-9\-]+');