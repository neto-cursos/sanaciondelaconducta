<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CalendarioController extends Controller
{
  public function index()
  {
    //recuperar sesiones del psicologo
    $sesions = DB::table('sesions')
      ->join('psicologos', 'sesions.psicologo_id', '=', 'psicologos.id')
      ->join('users', 'psicologos.user_id', '=', 'users.id')
      ->where('users.id', Auth::id())
      ->where('sesions.estado', 'programada')
      ->get();

         Log::info('sesions');
    Log::info($sesions);

    if($sesions->first()){
      $horarios = DB::table('horarios')
      ->where('psicologo_id', $sesions->first()->psicologo_id)
      ->where('isDisponible', 1)
      ->get();
    }else{
      $auxiliar100= DB::table('psicologos')
      ->selectRaw('psicologos.id')
      ->join('users', 'psicologos.user_id', '=', 'users.id')
      ->where('users.id', Auth::id())
      ->get();
      $horarios = DB::table('horarios')
      ->where('psicologo_id', $auxiliar100->first()->id)
      ->where('isDisponible', 1)
      ->get();
    }
    //recuperar disponibilidad de horarios del psicologo
    

    Log::info('horariossssss');
    Log::info($horarios);

    return Inertia::render('Calendario', [
      'sesions' => $sesions,
      'horarios' => $horarios,
    ]);
  }
}
