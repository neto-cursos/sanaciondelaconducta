<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * Class User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property string|null $profile_photo_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $canal_comunicacion
 * @property int|null $contador_bloqueos
 * @property bool|null $bloqueo_permanente
 * @property Carbon $fecha_nacimiento
 * @property string|null $ocupacion
 * @property string $ci
 * @property string $codigo_pais_telefono
 * @property string $telefono
 * @property string $pregunta_seguridad_a
 * @property string $pregunta_seguridad_b
 * @property string $respuesta_seguridad_a
 * @property string $respuesta_seguridad_b
 *
 * @package App\Models
 */
class User extends Authenticatable
{
  use HasApiTokens;
  use HasFactory;
  use HasProfilePhoto;
  use Notifiable;
  use TwoFactorAuthenticatable;
  use HasRoles;

  protected $table = 'users';

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    //'two_factor_confirmed_at' => 'datetime',
    //'current_team_id' => 'int',
    'contador_bloqueos' => 'int',
    'bloqueo_permanente' => 'bool',
    'fecha_nacimiento' => 'datetime',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
    'two_factor_recovery_codes',
    'two_factor_secret',
  ];

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'email_verified_at',
    'name',
    'apellidos',
    'email',
    'password',
    //'current_team_id',
    'canal_comunicacion',
    'contador_bloqueos',
    'bloqueo_permanente',
    'fecha_nacimiento',
    'ocupacion',
    'ci',
    'codigo_pais_telefono',
    'telefono',
    'pregunta_seguridad_a',
    'pregunta_seguridad_b',
    'respuesta_seguridad_a',
    'respuesta_seguridad_b',
  ];

  /**
   * The accessors to append to the model's array form.
   *
   * @var array<int, string>
   */
  protected $appends = ['profile_photo_url'];
}
