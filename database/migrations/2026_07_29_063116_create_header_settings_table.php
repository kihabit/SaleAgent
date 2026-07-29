<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('header_settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo_image')->nullable();
            $table->string('logo_text')->nullable();
            $table->string('logo_link')->default('/');
            $table->boolean('is_sticky')->default(true);
            $table->string('cta_text')->nullable();
            $table->string('cta_url')->nullable();
            $table->string('cta_style')->default('primary');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('header_settings');
    }
};