<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tutor
 *
 * @property int $id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int $user_id
 *
 * @property Collection|SolicitudTutor[] $solicitud_tutors
 *
 * @package App\Models
 */
class Tutor extends Model
{
  protected $table = 'tutors';

  protected $casts = [
    'user_id' => 'int',
  ];

  protected $fillable = ['user_id'];

  /*public function solicitud_tutors()
	{
		return $this->hasMany(SolicitudTutor::class, 'tutor_solicitante');
	}*/
}
