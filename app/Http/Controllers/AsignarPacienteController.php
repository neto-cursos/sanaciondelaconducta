<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\SolicitudTutor;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NotificacionSolicitudTutor;
use App\Models\PacienteTutor;
use Illuminate\Support\Facades\DB;

class AsignarPacienteController extends Controller
{
  public function index()
  {
    return Inertia::render(
      'AsignarPaciente' /*, [
      'users' => $users,
    ]*/
    );
  }

  //asignar el tutor al paciente
  public function update(Request $request, $id)
  {
    Log::info('paciente ci');
    Log::info($request->get('ci'));
    //recuperar paciente menor de edad y su tutor
    $results = DB::table('users')
      ->selectRaw(
        'paciente_tutor.paciente_id, paciente_tutor.tutor_id, ci, name, apellidos'
      )
      ->whereRaw(
        '(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), fecha_nacimiento)), "%Y") + 0)<18'
      )
      ->join('pacientes', 'users.id', '=', 'pacientes.user_id')
      ->join(
        'paciente_tutor',
        'pacientes.id',
        '=',
        'paciente_tutor.paciente_id'
      )
      ->where('ci', '=', $request->get('ci'))
      ->get();
    Log::info('id paciente, id tutor, ci, name, apellidos');
    Log::info($results);

    $userTutor = Auth::user();
    //Log::info('tutor que solicita ');
    //Log::info($userTutor->id);

    //recuperar id del tutor loggeado
    $tutorSolicitante = DB::table('users')
      ->selectRaw('tutors.id, ci, name, apellidos')
      ->join('tutors', 'users.id', '=', 'tutors.user_id')
      ->where('users.id', '=', $userTutor->id)
      ->get();
    Log::info('id tutor solicitante, ci, name, apellidos');
    Log::info($tutorSolicitante);

    $obj = new SolicitudTutor();
    $obj->paciente_id = $results->first()->paciente_id;
    $obj->tutor_actual = $results->first()->tutor_id;
    $obj->tutor_solicitante = $tutorSolicitante->first()->id;
    $obj->estado = 'pendiente';
    $obj->ci = $results->first()->ci;
    $obj->name = $tutorSolicitante->first()->name;
    $obj->apellidos = $tutorSolicitante->first()->apellidos;
    Log::info('obj');
    Log::info($obj);
    $obj->save();

    //la siguiente sentencia no sirve porque usa el ci del paciente y no su id. O MANEJAMOS EL CI? NO OLVIDAR QUE ES UNA TABLA INTERMEDIA CON EL ID DEL PACIENTE Y EL TUTOR
    /* $user->fill($request->input())->saveOrFail();*/
    //Log::info('solicitando asignacion de  paciente');
    // Log::info($id);

    /*$pacientetutor = new PacienteTutor();
    $pacientetutor->paciente_id = $request->get('ci');
    $pacientetutor->tutor_id = 130;
    $pacientetutor->save();*/

    //Notification::send('carlosmendizabal299@gmail.com', new Prueba());
    \Notification::route('mail', 'carlosmendizabal299@gmail.com')->notify(
      new NotificacionSolicitudTutor(/*$invoice*/)
    );
    //return redirect('asignarPaciente');
  }
}
