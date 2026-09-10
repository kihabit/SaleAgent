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
        Schema::create('faq_sections', function (Blueprint $table) {
            $table->id();

            // Section heading
            $table->string('eyebrow')->default('Need to know more?');
            $table->string('heading')->default('Frequently Asked Questions');
            $table->text('description');

            // Question 1
            $table->string('question_1');
            $table->text('answer_1');

            // Question 2
            $table->string('question_2');
            $table->text('answer_2');

            // Question 3
            $table->string('question_3');
            $table->text('answer_3');

            // Question 4
            $table->string('question_4');
            $table->text('answer_4');

            // Question 5
            $table->string('question_5');
            $table->text('answer_5');

            // Question 6
            $table->string('question_6');
            $table->text('answer_6');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_sections');
    }
};