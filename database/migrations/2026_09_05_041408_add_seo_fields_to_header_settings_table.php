<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('logo_link');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->text('google_analytics_code')->nullable()->after('meta_description');
        });
    }

    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'google_analytics_code']);
        });
    }
};