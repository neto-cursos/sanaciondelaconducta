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
    $userTutor = Auth::user();

    $tutor = DB::table('users')
      ->selectRaw('tutors.id')
      ->leftJoin('tutors', 'tutors.user_id', '=', 'users.id')
      ->where('users.id', $userTutor->id)
      ->get();

    Log::info('id tabla tutors');
    Log::info($tutor->first()->id);

    //recuperar solicitudes pendientes de este usuario
    $solicitudes = DB::table('solicitud_tutor')
      ->where('solicitud_tutor.tutor_actual', $tutor->first()->id)
      ->where('solicitud_tutor.estado', 'pendiente')
      //->where('solicitud_tutor.tutor_actual', 233)
      ->get();

    return Inertia::render('SolicitudTutor', [
      'solicitudes' => $solicitudes,
    ]);
  }

  public function update(Request $request, $id)
  {
    Log::info('aceptar solicitud');
    Log::info($id);
    /*$solicitudTutor = SolicitudTutor::find($id);
    $solicitudTutor->estado = 'terminada';
    $solicitudTutor->saveOrFail();*/
    //return redirect('usuarios');
  }

  public function destroy($id)
  {
    Log::info('rechazar solicitud');
    Log::info($id);
    /*$solicitudTutor = SolicitudTutor::find($id);
    $solicitudTutor->estado = 'terminada';
    $solicitudTutor->saveOrFail();*/
    //return redirect('usuarios');
  }
}