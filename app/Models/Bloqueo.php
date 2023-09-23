<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Bloqueo
 * 
 * @property int $id
 * @property int $psicologo_id
 * @property int $paciente_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property bool $isBloqueado
 *
 * @package App\Models
 */
class Bloqueo extends Model
{
	protected $table = 'bloqueos';

	protected $casts = [
		'psicologo_id' => 'int',
		'paciente_id' => 'int',
		'isBloqueado' => 'bool'
	];

	protected $fillable = [
		'psicologo_id',
		'paciente_id',
		'isBloqueado'
	];
}
