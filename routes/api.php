<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HeaderSettingController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\FooterSettingController;
use App\Http\Controllers\Api\HeroSlideController;
use App\Http\Controllers\Api\AgentSectionController;
use App\Http\Controllers\Api\AgentCategoryController;
use App\Http\Controllers\Api\AgentController;
use App\Http\Controllers\Api\SolutionController;
use App\Http\Controllers\Api\CatalogueSettingController;
use App\Http\Controllers\Api\BottomSliderController;
use App\Http\Controllers\Api\BottomStepSliderController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\PageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/header-settings', [HeaderSettingController::class, 'index']);
Route::get('/menu-items', [MenuItemController::class, 'index']);
Route::get('/footer-settings', [FooterSettingController::class, 'index']);
Route::get('/hero-slides', [HeroSlideController::class, 'index']);
Route::get('/agent-section', [AgentSectionController::class, 'index']);
Route::get('/agent-categories', [AgentCategoryController::class, 'index']);
Route::get('/agents', [AgentController::class, 'index']);
Route::get('/solutions', [SolutionController::class, 'index']);
Route::get('/agent-section/slug/{slug}', [AgentSectionController::class, 'showBySlug']);
Route::get('/catalogue-settings', [CatalogueSettingController::class, 'index']);
Route::get('/bottom-sliders', [BottomSliderController::class, 'index']);
Route::get('/bottom-step-sliders', [BottomStepSliderController::class, 'index']);
Route::get('/footer-socials', [App\Http\Controllers\Api\FooterSocialController::class, 'index']);

Route::post('/consultation', [ConsultationController::class, 'store']);
Route::get('/pages/{slug}', [PageController::class, 'show']);