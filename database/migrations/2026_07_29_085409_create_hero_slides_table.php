<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('heading')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('btn1_text')->nullable();
            $table->string('btn1_url')->nullable();
            $table->string('btn2_text')->nullable();
            $table->string('btn2_url')->nullable();
            $table->string('btn3_text')->nullable();
            $table->string('btn3_url')->nullable();
            $table->json('stats')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};