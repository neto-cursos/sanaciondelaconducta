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

class PacientesController extends Controller
{
  public function index()
  {
    $user = Auth::user();
    Log::info('usuario');
    Log::info($user);

    $idPsicologo = DB::table('users')
      ->select('psicologos.id')
      ->join('psicologos', 'users.id', '=', 'psicologos.user_id')
      ->where('users.id', Auth::id())
      ->get();
    Log::info('id Psicologo');
    Log::info($idPsicologo);

    $pacientes = DB::table('pacientes')
      ->selectRaw(
        'pacientes.id,name,apellidos,ci,isAlta,bloqueos.paciente_id as idpacientebloqueado, bloqueos.psicologo_id as idpsicologobloqueador, bloqueos.isBloqueado'
      )
      ->join('users', 'users.id', '=', 'pacientes.user_id')
      ->leftJoin(
        'bloqueos',
        'bloqueos.psicologo_id',
        '=',
        'pacientes.psicologo_id'
      )
      ->where('pacientes.psicologo_id', $idPsicologo->first()->id)
      ->get();

    Log::info('obj de pacientes del tutor');
    Log::info($pacientes);

    $objPre = DB::table('pacientes')
      ->selectRaw('pacientes.id')
      ->join('users', 'users.id', '=', 'pacientes.user_id')
      ->leftJoin(
        'bloqueos',
        'bloqueos.psicologo_id',
        '=',
        'pacientes.psicologo_id'
      )
      ->where('pacientes.psicologo_id', $idPsicologo->first()->id)
      ->get();

    $obj = [];
    foreach ($objPre as $objAuxi) {
      $obj[] = (array) $objAuxi;
    }

    $sesiones = DB::table('sesions')
      ->whereIn('paciente_id', $obj)
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    Log::info('sesiones');
    Log::info($sesiones);

    //pagos pendientes
    $pagos_pendientes = DB::table('pagos')
      ->join('sesions', 'pagos.sesion_id', '=', 'sesions.id')
      ->join('pacientes', 'sesions.paciente_id', '=', 'pacientes.id')
      ->join('users', 'pacientes.user_id', '=', 'users.id')
      ->where('isTerminado', 0)
      ->whereIn('sesions.paciente_id', $obj)
      ->get();

    return Inertia::render('Pacientes', [
      'user' => $user,
      'pacientes' => $pacientes,
      'sesiones' => $sesiones,
      'pagos_pendientes' => $pagos_pendientes,
    ]);
  }

  //solicitar sesion
  public function update(Request $request, $params)
  {
    Log::info('update');
    Log::info('request object');
    Log::info($request);
    $arrayAuxiliar = explode(',', $params);
    Log::info('fecha hora inicio');
    Log::info($arrayAuxiliar[0]);
    Log::info('fecha hora fin');
    Log::info($arrayAuxiliar[1]);
    Log::info('id paciente de tutor');
    Log::info($arrayAuxiliar[2]);

    $psicologoDePaciente = DB::table('pacientes')
      ->where('id', $arrayAuxiliar[2])
      ->get();
    Log::info('pacienteeeeeeeee');
    Log::info($psicologoDePaciente);
    Log::info('id psicologo de pacienteeeeeeeeeeee');
    Log::info($psicologoDePaciente->first()->psicologo_id);

    //reservar horario y registrar sesion con estado solicitud
    $horarioAux = DB::table('horarios')
      ->where('psicologo_id', $psicologoDePaciente->first()->psicologo_id)
      ->where('fecha_hora_inicio', $arrayAuxiliar[0])
      ->where('fecha_hora_fin', $arrayAuxiliar[1])
      ->get();

    Log::info('horarioAux antes');
    Log::info($horarioAux);

    $affected = DB::table('horarios')
      ->where('id', $horarioAux->first()->id)
      ->update(['isDisponible' => false]);

    Log::info('horarioNuevo despues');
    Log::info($affected);

    $sesionesAux = DB::table('sesions')
      ->where('sesions.paciente_id', $arrayAuxiliar[2])
      ->orderBy('sesions.updated_at', 'desc')
      ->get();

    Log::info('seseioness de pacienteeeee');
    Log::info($sesionesAux);

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
          'fecha_hora_inicio' => $arrayAuxiliar[0],
          'fecha_hora_fin' => $arrayAuxiliar[1],
          'solicitante' => 'paciente',
        ]);
      Log::info('asignados exitosamente');
      Log::info($affected2);
    } else {
      Log::info('crear sesion desde 0');
      $sesion = new Sesion();
      $sesion->estado = 'solicitada';
      $sesion->pago_confirmado = false;
      $sesion->fecha_hora_inicio = $arrayAuxiliar[0];
      $sesion->fecha_hora_fin = $arrayAuxiliar[1];
      $sesion->paciente_id = $arrayAuxiliar[2];
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

    return redirect('pacientes');
  }
}
