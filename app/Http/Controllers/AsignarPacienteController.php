<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\SolicitudTutor;
use App\Models\PacienteTutor;
use Illuminate\Support\Facades\DB;

class AsignarPacienteController extends Controller
{
  //hay que mandar el user loggeado?
  public function index()
  {
    //$users = User::all()->except(Auth::id());
    return Inertia::render(
      'AsignarPaciente' /*, [
      'users' => $users,
    ]*/
    );
    //  Log::info('LOG EXAMPLE');
  }

  //asignar el tutor al paciente
  public function update(Request $request, $id)
  {
    //Log::info('paciente ci');
    //Log::info($request->get('ci'));
    //recuperar paciente menor de edad
    $users = DB::table('users')
      ->selectRaw('users.id, ci, name, apellidos')
      ->whereRaw(
        '(DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), fecha_nacimiento)), "%Y") + 0)<18'
      )
      ->join('pacientes', 'users.id', '=', 'pacientes.user_id')
      ->where('ci', '=', $request->get('ci'))
      ->get();
    Log::info('edades');
    Log::info($users);
    //recuperar tutor primario del paciente menor de edad
    //$userPaciente = User::find($id);
    $userTutor = Auth::user();
    //la siguiente sentencia no sirve porque usa el ci del paciente y no su id. O MANEJAMOS EL CI? NO OLVIDAR QUE ES UNA TABLA INTERMEDIA CON EL ID DEL PACIENTE Y EL TUTOR
    /* $user->fill($request->input())->saveOrFail();*/
    //Log::info('solicitando asignacion de  paciente');
    // Log::info($id);

    /*$pacientetutor = new PacienteTutor();
    $pacientetutor->paciente_id = $request->get('ci');
    $pacientetutor->tutor_id = 130;
    $pacientetutor->save();*/

    //Log::info('a tutor ');
    //Log::info($userTutor);
    //Notification::send('carlosmendizabal299@gmail.com', new Prueba());
    \Notification::route('mail', 'carlosmendizabal299@gmail.com')->notify(
      new SolicitudTutor(/*$invoice*/)
    );
    //return redirect('asignarPaciente');
  }
}
