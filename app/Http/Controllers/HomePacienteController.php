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
use App\Models\Paciente;
use Illuminate\Support\Facades\DB;

class HomePacienteController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    //Log::info('usuario');
    //Log::info($user);

    $obj = DB::table('pacientes')
      ->where('pacientes.user_id', Auth::id())
      ->get();

    //Log::info('obj');
    //Log::info($obj);

    $sesiones = DB::table('sesions')
      ->where('sesions.paciente_id', $obj->first()->id)
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    //Log::info('sesiones');
    //Log::info($sesiones);

    //conectar cv desde tabla archivos
    $psicologos = DB::table('users')
      ->selectRaw(
        'psicologos.id, name, apellidos,profile_photo_path,fecha_nacimiento,fecha_funcion_titulo,universidad,ciudad_residencia,departamento_residencia,pais_residencia,descripcion_cv,foto,archivo,tipo_archivo'
      )
      ->join('psicologos', 'users.id', '=', 'psicologos.user_id')
      ->leftjoin('archivos', 'archivos.psicologo_id', '=', 'psicologos.id')
      ->where('psicologos.estado', 'activo')
      ->get();

    //pagos pendientes
    $pagos_pendientes = DB::table('pagos')
      ->join('sesions', 'pagos.sesion_id', '=', 'sesions.id')
      ->join('pacientes', 'sesions.paciente_id', '=', 'pacientes.id')
      ->join('users', 'pacientes.user_id', '=', 'users.id')
      ->where('isTerminado', 0)
      ->get();

    return Inertia::render('HomePaciente', [
      'user' => $user,
      'psicologo_id' => $obj->first()->psicologo_id,
      'paciente_id' => $obj->first()->id,
      'sesiones' => $sesiones,
      'psicologos' => $psicologos,
      'pagos_pendientes' => $pagos_pendientes,
    ]);
    //  Log::info('LOG EXAMPLE');
  }

  //funcion para pago de sesion cancelada
  public function store(Request $request)
  {
    Log::info('store');
    Log::info($request);
  }

  //programar sesion
  public function update(Request $request, $id)
  {
    Log::info('update');
    Log::info($request);
    Log::info('parametro');
    Log::info($id);
    //if request psicologo distinto de ""
    //asignarpsicologo
    //programar sesion

    /* $user = User::find($id);
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fill($request->input())->saveOrFail();
    return redirect('usuarios');*/
  }

  //asignar psicologo a paciente
  public function destroy($params)
  {
    $arrayAux = explode(',', $params);
    Log::info('id paciente');
    Log::info($arrayAux[0]);
    Log::info('id psicologo');
    Log::info($arrayAux[1]);

    $pac = Paciente::find($arrayAux[0]);
    Log::info('paciente antes de editar');
    Log::info($pac);
    $pac->psicologo_id = $arrayAux[1];
    Log::info('paciente luego de editar');
    Log::info($pac);
    $pac->saveOrFail();
    return redirect('homePaciente');
  }
}
