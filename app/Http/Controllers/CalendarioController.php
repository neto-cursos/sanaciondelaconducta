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

    //recuperar disponibilidad de horarios del psicologo
      if($sesions->first()){
    $horarios = DB::table('horarios')
      ->where('psicologo_id', $sesions->first()->psicologo_id)
      ->where('isDisponible', 1)
      ->get();
}else{
      
      $horarios = [];
    }
    //Log::info('aaaaaaaaaaaaaaaaaaaa');
    //Log::info($sesions->first()->psicologo_id);

    return Inertia::render('Calendario', [
      'sesions' => $sesions,
      'horarios' => $horarios,
    ]);
  }
}
