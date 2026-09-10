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
        Schema::create('ai_opportunity_sections', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->nullable()->unique();
            $table->string('eyebrow')->default('AI Opportunity Guide');
            $table->string('heading');
            $table->text('description');
            $table->string('button_text')->default('Book a Demo');
            $table->string('button_url')->nullable();

            // "Who It's For" list
            $table->string('who_title')->default("Who It's For:");
            $table->string('who_item_1')->nullable();
            $table->string('who_item_2')->nullable();
            $table->string('who_item_3')->nullable();
            $table->string('who_item_4')->nullable();

            // "What You Can Do" list
            $table->string('what_title')->default('What You Can Do:');
            $table->string('what_item_1')->nullable();
            $table->string('what_item_2')->nullable();
            $table->string('what_item_3')->nullable();
            $table->string('what_item_4')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_opportunity_sections');
    }
};