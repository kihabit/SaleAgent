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
        Schema::create('agent_library_list_sections', function (Blueprint $table) {
            $table->id();

            $table->string('slug')->nullable()->unique();
            $table->string('heading');
            $table->text('description');
            $table->string('search_placeholder')->default('Search');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_library_list_sections');
    }
};