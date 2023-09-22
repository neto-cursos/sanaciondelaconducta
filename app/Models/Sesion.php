<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sesion
 *
 * @property int $id
 * @property string $estado
 * @property bool $pago_confirmado
 * @property Carbon|null $fecha_hora_inicio
 * @property Carbon|null $fecha_hora_fin
 * @property int $paciente_id
 * @property int $psicologo_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $descripcion_sesion
 * @property int|null $calificacion
 * @property string|null $calificacion_descripcion
 *
 * @package App\Models
 */
class Sesion extends Model
{
  protected $table = 'sesions';

  protected $casts = [
    'pago_confirmado' => 'bool',
    'fecha_hora_inicio' => 'datetime',
    'fecha_hora_fin' => 'datetime',
    'paciente_id' => 'int',
    'psicologo_id' => 'int',
    'calificacion' => 'int',
    'contador_cancelaciones' => 'int',
  ];

  protected $fillable = [
    'estado',
    'pago_confirmado',
    'fecha_hora_inicio',
    'fecha_hora_fin',
    'paciente_id',
    'psicologo_id',
    'descripcion_sesion',
    'calificacion',
    'calificacion_descripcion',
    'contador_cancelaciones',
    'solicitante',
    'cancelador',
  ];
}
