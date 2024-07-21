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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('class');
            $table->integer('year');
            $table->string('img')->nullable();
            $table->date('dob');
            $table->string('gender');
            $table->string('religion');
            $table->string('bloodGroup');
            $table->string('address');
            $table->string('father');
            $table->string('fatherPhone');
            $table->string('mother');
            $table->string('motherPhone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
