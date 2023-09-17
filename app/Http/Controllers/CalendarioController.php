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
    Log::info('IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD: ');
    Log::info(Auth::id());

    //recuperar sesiones del usuario y mandarlas con el rener
    $sesions = DB::table('sesions')
      ->leftJoin('pacientes', 'sesions.paciente_id', '=', 'pacientes.user_id')
      ->leftJoin('users', 'pacientes.user_id', '=', 'users.id')
      ->get();
    //$users = User::all()->except(Auth::id());
    return Inertia::render('Calendario', [
      //'users' => $users,
      'sesions' => $sesions,
    ]);
    //  Log::info('LOG EXAMPLE');
  }

  //guardo como plantilla pero no pertenece a este controlador
  /*public function update(Request $request, $id)
  {
    $user = User::find($id);
    $user->fill($request->input())->saveOrFail();
    return redirect('calendario');
  }*/
}
