<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SolicitudTutor
 *
 * @property int $id
 * @property int $paciente_id
 * @property int $tutor_actual
 * @property int $tutor_solicitante
 * @property string $estado
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Tutor $tutor
 *
 * @package App\Models
 */
class SolicitudTutor extends Model
{
  protected $table = 'solicitud_tutor';

  protected $casts = [
    'paciente_id' => 'int',
    'tutor_actual' => 'int',
    'tutor_solicitante' => 'int',
  ];

  protected $fillable = [
    'paciente_id',
    'tutor_actual',
    'tutor_solicitante',
    'estado',
    'ci',
    'name',
    'apellidos',
  ];

  /*public function tutor()
	{
		return $this->belongsTo(Tutor::class, 'tutor_solicitante');
	}*/
}
