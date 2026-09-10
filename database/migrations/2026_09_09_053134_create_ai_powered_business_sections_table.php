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
        Schema::create('ai_powered_business_sections', function (Blueprint $table) {
            $table->id();

            $table->string('heading_black');
            $table->string('heading_colored');
            $table->text('description');

            $table->string('feature_1_title')->default('Automate');
            $table->text('feature_1_description');
            $table->string('feature_1_color')->default('#fba226');

            $table->string('feature_2_title')->default('Scale');
            $table->text('feature_2_description');
            $table->string('feature_2_color')->default('#2ababe');

            $table->string('feature_3_title')->default('Govern');
            $table->text('feature_3_description');
            $table->string('feature_3_color')->default('#051895');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_powered_business_sections');
    }
};