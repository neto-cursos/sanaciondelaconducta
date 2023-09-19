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

class SolicitudTutorController extends Controller
{
  public function index()
  {
    //recuperar solicitudes pendientes a este usuario
    $solicitudes = DB::table('solicitud_tutor as a')

      //->selectRaw('')

      //psicologo solicitante
      ->leftJoin('tutors as b', 'a.tutor_solicitante', '=', 'b.id')
      ->leftJoin('users as c', 'b.id', '=', 'c.id')
      //psicologo receptor
      ->leftJoin('tutors as d', 'a.tutor_actual', '=', 'd.id')
      ->leftJoin('users as e', 'd.id', '=', 'e.id')
      //paciente
      ->leftJoin('pacientes as f', 'a.paciente_id', '=', 'f.id')
      ->leftJoin('users as g', 'f.id', '=', 'g.id')

      //->where('sesions.psicologo_id', Auth::id())
      ->get();

    //$users = User::all()->except(Auth::id());
    return Inertia::render('SolicitudTutor', [
      'solicitudes' => $solicitudes,
    ]);
    //  Log::info('LOG EXAMPLE');
  }

  /*public function update(Request $request, $id)
  {
    $user = User::find($id);
    $user->contador_bloqueos = 0;
    $user->bloqueo_permanente = false;
    $user->fill($request->input())->saveOrFail();
    return redirect('usuarios');
  }*/
}
