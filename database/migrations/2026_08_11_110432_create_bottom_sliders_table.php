<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bottom_sliders', function (Blueprint $table) {
            $table->id();
            $table->string('badge_text')->nullable();
            $table->string('page_slug')->nullable();
            $table->string('heading_normal');
            $table->string('heading_highlighted');
            $table->text('description');
            $table->string('primary_btn_text')->nullable();
            $table->string('primary_btn_link')->nullable();
            $table->string('secondary_btn_text')->nullable();
            $table->string('secondary_btn_link')->nullable();
            $table->json('features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bottom_sliders');
    }
};