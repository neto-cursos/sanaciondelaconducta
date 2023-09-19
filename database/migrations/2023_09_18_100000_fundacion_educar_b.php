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
    Schema::create('solicitud_tutor', function (Blueprint $table) {
      $table->id();
      $table->foreignId('paciente_id');
      $table->foreignId('tutor_actual')->constrained('tutors');
      $table->foreignId('tutor_solicitante')->constrained('tutors');
      //los estados son pendiente y terminada
      $table->string('estado');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('solicitud_tutor');
  }
};
