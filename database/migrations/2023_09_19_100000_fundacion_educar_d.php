<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table('solicitud_tutor', function (Blueprint $table) {
      $table->string('ci');
      $table->string('name');
      $table->string('apellidos');
    });
  }

  /**
   * Reverse the migrations.
   */
  /*  public function down(): void
  {
    Schema::dropIfExists('solicitud_tutor');
  }*/
};
