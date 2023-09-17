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
    Schema::table('users', function (Blueprint $table) {
      /*El método de confirmación de cuenta se guarda en base de datos para que el sistema
        sepa cómo debe notificar a un usuario (puede tener 4 valores que son 
        sms, whatsapp, telegram, correo)*/
      $table->string('apellidos')->after('name');
      $table->string('canal_comunicacion');
      $table->smallInteger('contador_bloqueos')->nullable();
      $table->boolean('bloqueo_permanente')->nullable();
      $table->date('fecha_nacimiento');
      $table->string('ocupacion')->nullable();
      $table->string('ci');
      $table->string('codigo_pais_telefono');
      $table->string('telefono');
      $table->string('pregunta_seguridad_a');
      $table->string('pregunta_seguridad_b');
      $table->string('respuesta_seguridad_a');
      $table->string('respuesta_seguridad_b');
    });

    //Un psicólogo pueden tener 3 estados (activo, inactivo, ausente temporalmente)
    Schema::create('psicologos', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id');
      //Un psicólogo pueden tener 3 estados (activo, inactivo, ausente temporalmente)
      $table->string('estado');
      $table->timestamps();
      $table->date('fecha_funcion_titulo');
      $table->string('universidad');
      $table->string('ciudad_residencia');
      $table->string('departamento_residencia');
      $table->string('pais_residencia');
      //los archivos del cv se guardan en la tabla archivos
      $table->string('descripcion_cv')->nullable();
      $table->binary('foto');
    });

    Schema::create('pacientes', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->nullable();
      $table->foreignId('psicologo_id')->nullable();
      $table->timestamps();
      //Si el paciente esta dado de alta isAlta = true
      $table->boolean('isAlta');
    });

    Schema::create('tutors', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
    });

    Schema::create('paciente_tutor', function (Blueprint $table) {
      $table->id();
      $table->foreignId('paciente_id');
      $table->foreignId('tutor_id');
      $table->timestamps();
    });

    Schema::create('sesions', function (Blueprint $table) {
      $table->id();
      //La sesion puede tener uno de estos 3 estados (programada, cancelada y futura)
      $table->string('estado');
      $table->boolean('pago_confirmado');
      $table->timestamp('fecha_hora_inicio')->nullable();
      $table->timestamp('fecha_hora_fin')->nullable();
      $table->foreignId('paciente_id');
      $table->foreignId('psicologo_id');
      $table->timestamps();
      $table->string('descripcion_sesion')->nullable();
      $table->smallInteger('calificacion')->nullable();
      $table->string('calificacion_descripcion')->nullable();
    });

    Schema::create('pagos', function (Blueprint $table) {
      $table->id();
      $table->string('servicio')->nullable();
      $table->string('institucion')->nullable();
      $table->string('convenio')->nullable();
      $table->foreignId('sesions_id');
      $table->timestamps();
    });

    Schema::create('archivos', function (Blueprint $table) {
      $table->id();
      $table->binary('archivo');
      $table->string('tipo_archivo');
      //psicologo_id si el archivo es la foto del psicologo
      $table->foreignId('psicologo_id')->nullable();
      //sesion_id si el archivo se refiere a informacion de sesion
      $table->foreignId('sesion_id')->nullable();
      //pago_id si el archivo es el comprobante de pago de la sesion
      $table->foreignId('pago_id')->nullable();
      $table->timestamps();
    });

    Schema::create('horarios', function (Blueprint $table) {
      $table->id();
      $table->foreignId('psicologo_id');
      $table->timestamp('fecha_hora_inicio')->nullable();
      $table->timestamp('fecha_hora_fin')->nullable();
      $table->timestamps();
      //isDisponible es true si el horario no tiene una sesion agendada. Es false si se ha agendado una sesion en este horario
      $table->boolean('isDisponible');
    });
  }

  /**
   * Reverse the migrations.
   */
  /*  public function down(): void
  {
  }*/
};

//$table->foreign('user_id')->references('id')->on('users');
