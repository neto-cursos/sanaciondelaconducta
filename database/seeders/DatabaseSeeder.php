<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Tutor;
use App\Models\Paciente;
use App\Models\Psicologo;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    //Datos iniciales de la base de datos
    $roleAdministrador = Role::create(['name' => 'administrador']);
    $roleTutor = Role::create(['name' => 'tutor']);
    $rolePaciente = Role::create(['name' => 'paciente']);
    $rolePsicologo = Role::create(['name' => 'psicologo']);

    $user = new User();
    $user->name = 'administrador';
    $user->apellidos = 'apellido';
    $user->email = 'administrador@gmail.com';
    $user->password = bcrypt('administrador');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($roleAdministrador);
    //Todos los datos a continuación son de prueba y deben eliminarse antes de pasar a fase de produccion

    //$permission = Permission::create(['name' => 'edit articles']);

    //\App\Models\User::factory(100)->create();

    $user = new User();
    $user->name = 'psicologo';
    $user->apellidos = 'apellido';
    $user->email = 'psicologo@gmail.com';
    $user->password = bcrypt('psicologo');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($rolePsicologo);

    $psicologo=new Psicologo();
    $psicologo->user_id=$user->id;
    $psicologo->estado='activo';
    $psicologo->save();

    $user = new User();
    $user->name = 'psicologo2';
    $user->apellidos = 'apellido2';
    $user->email = 'psicologo2@gmail.com';
    $user->password = bcrypt('psicologo2');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($rolePsicologo);

    $psicologo=new Psicologo();
    $psicologo->user_id=$user->id;
    $psicologo->estado='activo';
    $psicologo->save();

    $user = new User();
    $user->name = 'tutor';
    $user->apellidos = 'apellido';
    $user->email = 'tutor@gmail.com';
    $user->password = bcrypt('tutor');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($roleTutor);

    $tutor=new Tutor();
    $tutor->user_id=$user->id;
    $tutor->save();

    $user = new User();
    $user->name = 'tutor2';
    $user->apellidos = 'apellido2';
    $user->email = 'tutor2@gmail.com';
    $user->password = bcrypt('tutor2');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2010-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '54321';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7341342';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($roleTutor);

    $tutor=new Tutor();
    $tutor->user_id=$user->id;
    $tutor->save();

    $user = new User();
    $user->name = 'paciente';
    $user->apellidos = 'apellido';
    $user->email = 'paciente@gmail.com';
    $user->password = bcrypt('paciente');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($rolePaciente);

    $paciente=new Paciente();
    $paciente->user_id=$user->id;
    $paciente->isAlta=0;
    $paciente->save();

    $user = new User();
    $user->name = 'paciente2';
    $user->apellidos = 'apellido_paciente2';
    $user->email = 'paciente2@gmail.com';
    $user->password = bcrypt('paciente2');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'médico';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347373';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
    $user->assignRole($rolePaciente);

    $paciente=new Paciente();
    $paciente->user_id=$user->id;
    $paciente->isAlta=0;
    $paciente->save();

    $user = new User();
    $user->name = 'sinrol';
    $user->apellidos = 'apellido';
    $user->email = 'sinrol@gmail.com';
    $user->password = bcrypt('sinrol');
    $user->email_verified_at = now();
    $user->canal_comunicacion = 'correo';
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fecha_nacimiento = '2023-02-02';
    $user->ocupacion = 'ingeniero';
    $user->ci = '219301249asd';
    $user->codigo_pais_telefono = '+591';
    $user->telefono = '7347272';
    $user->pregunta_seguridad_a = 'pregunta a';
    $user->pregunta_seguridad_b = 'pregunta b';
    $user->respuesta_seguridad_a = 'respuesta a';
    $user->respuesta_seguridad_b = 'respuesta b';
    $user->save();
  }
}

/*$user->contador_bloqueos=0;
      $user->bloqueo_permanente=false;
      $user->fecha_nacimiento = '2023-02-02';
      $user->ocupacion='ingeniero';
      $user->ci='219301249asd';
      $user->codigo_pais_telefono='+591';
      $user->telefono='7347272';
      $user->pregunta_seguridad_a='pregunta a';
      $user->pregunta_seguridad_b='pregunta b';
      $user->respuesta_seguridad_a='respuesta a';
      $user->respuesta_seguridad_b='respuesta b';*/
