<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pago
 *
 * @property int $id
 * @property string|null $servicio
 * @property string|null $institucion
 * @property string|null $convenio
 * @property int $sesions_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property bool $isTerminado
 *
 * @package App\Models
 */
class Pago extends Model
{
  protected $table = 'pagos';

  protected $casts = [
    'sesion_id' => 'int',
    'isTerminado' => 'bool',
  ];

  protected $fillable = [
    'servicio',
    'institucion',
    'convenio',
    'sesion_id',
    'isTerminado',
  ];
}
