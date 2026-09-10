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
        Schema::create('agents_action_sections', function (Blueprint $table) {
            $table->id();

            // Section heading
            $table->string('eyebrow')->default('AI-Powered Workflows');
            $table->string('heading')->default('AI Agents in Action');
            $table->text('description');

            // Card 1
            $table->string('card_1_label');
            $table->string('card_1_title');
            $table->string('card_1_slug')->nullable();
            $table->text('card_1_description');
            $table->string('card_1_image')->nullable();
            $table->string('card_1_image_alt')->nullable();

            // Card 2
            $table->string('card_2_label');
            $table->string('card_2_title');
            $table->string('card_2_slug')->nullable();
            $table->text('card_2_description');
            $table->string('card_2_image')->nullable();
            $table->string('card_2_image_alt')->nullable();

            // Card 3
            $table->string('card_3_label');
            $table->string('card_3_title');
            $table->string('card_3_slug')->nullable();
            $table->text('card_3_description');
            $table->string('card_3_image')->nullable();
            $table->string('card_3_image_alt')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agents_action_sections');
    }
};