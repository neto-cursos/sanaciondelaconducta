<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\Prueba;
use App\Models\PacienteTutor;
use Illuminate\Support\Facades\DB;

class HomePacienteController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    Log::info('usuario');
    Log::info($user);

    $obj = DB::table('pacientes')
      ->where('pacientes.user_id', Auth::id())
      ->get();

    Log::info('obj');
    Log::info($obj);

    $sesiones = DB::table('sesions')
      ->where('sesions.paciente_id', $obj->first()->id)
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    Log::info('sesiones');
    Log::info($sesiones);

    //conectar cv desde tabla archivos
    if ($obj->first()->psicologo_id != null) {
      $psicologos = DB::table('users')
        ->selectRaw(
          'psicologos.id, name, apellidos,profile_photo_path,fecha_nacimiento,fecha_funcion_titulo,universidad,ciudad_residencia,departamento_residencia,pais_residencia,descripcion_cv,foto'
        )
        ->join('psicologos', 'users.id', '=', 'psicologos.user_id')
        ->where('psicologos.estado', 'activo')
        ->get();
    } else {
      $psicologos = [];
    }

    return Inertia::render('HomePaciente', [
      'user' => $user,
      'psicologo_id' => $obj->first()->psicologo_id,
      'paciente_id' => $obj->first()->id,
      'sesiones' => $sesiones,
      'psicologos' => $psicologos,
    ]);
    //  Log::info('LOG EXAMPLE');
  }

  //funcion para pago de sesion cancelada
  public function store(Request $request)
  {
  }

  //programar sesion
  public function update(Request $request, $id)
  {
    //if request psicologo distinto de ""
    //asignarpsicologo
    //programar sesion

    /* $user = User::find($id);
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fill($request->input())->saveOrFail();
    return redirect('usuarios');*/
  }
}
