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