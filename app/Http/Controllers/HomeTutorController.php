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
use App\Models\Pago;
use App\Models\Paciente;
use App\Models\Horario;
use App\Models\Sesion;
use Illuminate\Support\Facades\DB;

class HomeTutorController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    //Log::info('usuario');
    //Log::info($user);

    $objPre = DB::table('pacientes')
      ->select('pacientes.id')
      ->join(
        'paciente_tutor',
        'pacientes.id',
        '=',
        'paciente_tutor.paciente_id'
      )
      ->join('tutors', 'paciente_tutor.tutor_id', '=', 'tutors.id')
      ->join('users', 'users.id', '=', 'tutors.user_id')
      ->where('users.id', Auth::id())
      ->get();

    //Log::info('obj de ids de tabla pacientes del tutor pre');
    //Log::info($objPre);

    $obj = [];
    foreach ($objPre as $objAuxi) {
      $obj[] = (array) $objAuxi;
    }

    //Log::info('obj de ids de tabla pacientes del tutor after');
    //Log::info($obj);

    $sesiones = DB::table('sesions')
      ->whereIn('paciente_id', $obj)
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    //Log::info('sesiones');
    //Log::info($sesiones);

    //pacientes del tutor info completa
    $pacientes = DB::table('users')
      ->selectRaw('pacientes.id, pacientes.psicologo_id, name, apellidos, ci')
      ->join('pacientes', 'users.id', '=', 'pacientes.user_id')
      ->whereIn('pacientes.id', $obj)
      ->get();

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
      ->whereIn('sesions.paciente_id', $obj)
      ->get();

    $psicologosAntes = DB::table('psicologos')
      ->selectRaw('psicologos.id')
      ->where('psicologos.estado', 'activo')
      ->get();

    $transformPsicologos = [];
    foreach ($psicologosAntes as $objAuxi2) {
      $transformPsicologos[] = (array) $objAuxi2;
    }

    //recuperar disponibilidad de horarios del psicologo
    $horarios = DB::table('horarios')
      ->whereIn('psicologo_id', $transformPsicologos)
      ->where('isDisponible', 1)
      ->get();

    return Inertia::render('HomeTutor', [
      'user' => $user,
      'pacientes' => $pacientes,
      'sesiones' => $sesiones,
      'psicologos' => $psicologos,
      'pagos_pendientes' => $pagos_pendientes,
      'horarios' => $horarios,
    ]);
    //  Log::info('LOG EXAMPLE');
  }

  //funcion para pago de sesion cancelada
  public function store(Request $request)
  {
    Log::info('request');
    Log::info($request);

    $sesionesAux = DB::table('sesions')
      ->where('sesions.paciente_id', $request->paciente_id)
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    Log::info('sesiones aux');
    Log::info($sesionesAux);

    Log::info('sesion id');
    Log::info($sesionesAux->first()->id);

    $pago = new Pago();
    $pago->sesion_id = $sesionesAux->first()->id;
    $pago->servicio = $request->servicio;
    $pago->institucion = $request->institucion;
    $pago->convenio = $request->convenio;
    $pago->isTerminado = 0;
    $pago->save();
    Log::info('obj nuevo');
    Log::info($pago);
    return redirect('homeTutor');
  }

  //solicitar sesion
  public function update(Request $request, $params)
  {
    Log::info('update');
    Log::info('request object');
    Log::info($request);
    $arrayAuxiliar = explode(',', $params);
    Log::info('id horario');
    Log::info($arrayAuxiliar[0]);
    Log::info('id paciente de tutor');
    Log::info($arrayAuxiliar[1]);

    $psicologoDePaciente = DB::table('pacientes')
      ->where('id', $arrayAuxiliar[1])
      ->get();
    Log::info('pacienteeeeeeeee');
    Log::info($psicologoDePaciente);
    Log::info('id psicologo de pacienteeeeeeeeeeee');
    Log::info($psicologoDePaciente->first()->psicologo_id);

    //reservar horario y registrar sesion con estado solicitud
    $horarioAux = DB::table('horarios')
      ->where('id', $arrayAuxiliar[0])
      ->get();

    Log::info('horarioAux antes');
    Log::info($horarioAux);

    $affected = DB::table('horarios')
      ->where('id', $arrayAuxiliar[0])
      ->update(['isDisponible' => false]);

    Log::info('horarioNuevo despues');
    Log::info($affected);

    $sesionesAux = DB::table('sesions')
      ->where('sesions.paciente_id', $arrayAuxiliar[1])
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    Log::info('seseioness de pacienteeeee');
    Log::info($sesionesAux);
    if (is_null($sesionesAux->first())) {
      Log::info('crear sesion desde 0');
      $sesion = new Sesion();
      $sesion->estado = 'solicitada';
      $sesion->pago_confirmado = false;
      $sesion->fecha_hora_inicio = $horarioAux->first()->fecha_hora_inicio;
      $sesion->fecha_hora_fin = $horarioAux->first()->fecha_hora_fin;
      $sesion->paciente_id = $arrayAuxiliar[1];
      $sesion->psicologo_id = $psicologoDePaciente->first()->psicologo_id;
      $sesion->solicitante = 'paciente';
      $sesion->contador_cancelaciones = 0;

      Log::info('objeto lleno');
      Log::info($sesion);
      $sesion->saveOrFail();
    } else {
      if (
        is_null($sesionesAux->first()->fecha_hora_inicio) &&
        $sesionesAux->first()->psicologo_id ==
          $psicologoDePaciente->first()->psicologo_id
      ) {
        Log::info('asignar valores a sesion existente');
        $affected2 = DB::table('sesions')
          ->where('id', $sesionesAux->first()->id)
          ->update([
            'estado' => 'solicitada',
            'fecha_hora_inicio' => $horarioAux->first()->fecha_hora_inicio,
            'fecha_hora_fin' => $horarioAux->first()->fecha_hora_fin,
            'solicitante' => 'paciente',
          ]);
        Log::info('asignados exitosamente');
        Log::info($affected2);
      } else {
        Log::info('crear sesion desde 0');
        $sesion = new Sesion();
        $sesion->estado = 'solicitada';
        $sesion->pago_confirmado = false;
        $sesion->fecha_hora_inicio = $horarioAux->first()->fecha_hora_inicio;
        $sesion->fecha_hora_fin = $horarioAux->first()->fecha_hora_fin;
        $sesion->paciente_id = $arrayAuxiliar[1];
        $sesion->psicologo_id = $psicologoDePaciente->first()->psicologo_id;
        $sesion->solicitante = 'paciente';
        if (
          $sesionesAux->first()->cancelador == 'paciente' &&
          $sesionesAux->first()->psicologo_id ==
            $psicologoDePaciente->first()->psicologo_id &&
          $sesionesAux->first()->pago_confirmado == false
        ) {
          $sesion->contador_cancelaciones =
            1 + $sesionesAux->first()->contador_cancelaciones;
        } else {
          $sesion->contador_cancelaciones = 0;
        }
        Log::info('objeto lleno');
        Log::info($sesion);
        $sesion->saveOrFail();
      }
    }
    return redirect('homeTutor');
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
    return redirect('homeTutor');
  }
}
