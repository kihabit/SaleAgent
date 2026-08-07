<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->string('logo_alt_text')->nullable()->after('logo_image');
        });
    }

    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn('logo_alt_text');
        });
    }
};