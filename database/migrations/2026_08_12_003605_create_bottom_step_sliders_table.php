<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bottom_step_sliders', function (Blueprint $table) {
            $table->id();
            $table->string('badge_text')->nullable();
            $table->string('heading')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->text('description')->nullable();
            $table->json('steps')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bottom_step_sliders');
    }
};