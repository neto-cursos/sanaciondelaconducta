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
      ->leftJoin('pacientes', 'sesions.paciente_id', '=', 'pacientes.user_id')
      ->leftJoin('users', 'pacientes.user_id', '=', 'users.id')
      ->where('sesions.psicologo_id', Auth::id())
      ->get();

    //recuperar disponibilidad de horarios del psicologo
    $horarios = DB::table('horarios')
      ->where('psicologo_id', Auth::id())
      ->where('isDisponible', 1)
      ->get();

    return Inertia::render('Calendario', [
      'sesions' => $sesions,
      'horarios' => $horarios,
    ]);
  }
}
