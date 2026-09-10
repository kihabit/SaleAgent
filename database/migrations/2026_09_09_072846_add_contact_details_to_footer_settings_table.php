<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('footer_settings', function (Blueprint $table) {
            $table->string('contact_heading')->nullable()->after('connect_text');
            $table->json('contact_addresses')->nullable()->after('contact_heading');
            $table->string('contact_email')->nullable()->after('contact_addresses');
            $table->string('contact_phone')->nullable()->after('contact_email');
        });
    }

    public function down(): void
    {
        Schema::table('footer_settings', function (Blueprint $table) {
            $table->dropColumn(['contact_heading', 'contact_addresses', 'contact_email', 'contact_phone']);
        });
    }
};