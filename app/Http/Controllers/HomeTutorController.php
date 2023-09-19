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

class HomeTutorController extends Controller
{
  public function index()
  {
    //$users = User::all()->except(Auth::id());
    return Inertia::render('HomeTutor' /*, [
      'users' => $users,
    ]*/);
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
