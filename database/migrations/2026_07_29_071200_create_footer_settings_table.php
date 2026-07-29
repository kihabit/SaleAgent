<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo_image')->nullable();
            $table->string('about_heading')->nullable();
            $table->text('about_text')->nullable();
            $table->string('info_heading')->nullable();
            $table->text('info_text')->nullable();
            $table->string('info_link_text')->nullable();
            $table->string('info_link_url')->nullable();
            $table->string('connect_heading')->nullable();
            $table->text('connect_text')->nullable();
            $table->string('copyright_text')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_settings');
    }
};