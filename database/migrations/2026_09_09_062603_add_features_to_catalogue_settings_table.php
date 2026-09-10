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
        Schema::table('catalogue_settings', function (Blueprint $table) {
            // Hero image
            $table->string('hero_image')->nullable()->after('description');
            $table->string('hero_image_alt')->nullable()->after('hero_image');

            // Feature 1
            $table->string('feature_1_icon')->nullable()->after('hero_image_alt');
            $table->string('feature_1_title')->nullable()->after('feature_1_icon');

            // Feature 2
            $table->string('feature_2_icon')->nullable()->after('feature_1_title');
            $table->string('feature_2_title')->nullable()->after('feature_2_icon');

            // Feature 3
            $table->string('feature_3_icon')->nullable()->after('feature_2_title');
            $table->string('feature_3_title')->nullable()->after('feature_3_icon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('catalogue_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_image',
                'hero_image_alt',
                'feature_1_icon',
                'feature_1_title',
                'feature_2_icon',
                'feature_2_title',
                'feature_3_icon',
                'feature_3_title',
            ]);
        });
    }
};