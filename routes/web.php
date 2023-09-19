<?php
namespace App\http\Controllers;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', 'login');

//Solo un usuario autenticado puede ingresar a este grupo de rutas
Route::middleware([
  'auth:sanctum',
  config('jetstream.auth_session'),
  'verified',
])->group(function () {
  Route::get('/home', [HomeController::class, 'index'])->name('home');

  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::group(['middleware' => ['role:administrador']], function () {
    Route::get('/homeAdministrador', function () {
      return Inertia::render('HomeAdministrador');
    })->name('homeAdministrador');

    Route::resource('usuarios', ListaUsuariosController::class);
  });

  Route::group(['middleware' => ['role:psicologo']], function () {
    Route::resource('calendario', CalendarioController::class);
  });

  Route::group(['middleware' => ['role:tutor']], function () {
    Route::resource('homeTutor', HomeTutorController::class);

    Route::resource('asignarPaciente', AsignarPacienteController::class);

    Route::resource('solicitudTutor', SolicitudTutorController::class);
  });

  Route::group(['middleware' => ['role:paciente']], function () {
    Route::get('/homePaciente', function () {
      return Inertia::render('HomePaciente');
    })->name('homePaciente');
  });
});
