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
        Schema::create('crew_academy_sections', function (Blueprint $table) {
            $table->id();

            $table->string('badge_text')->default('KDS ERP CREW ACADEMY');
            $table->string('heading');
            $table->string('subheading');
            $table->text('description');
            $table->string('image')->nullable();
            $table->string('image_alt')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crew_academy_sections');
    }
};