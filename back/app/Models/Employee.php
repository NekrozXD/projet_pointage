<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{

    public function department()
    {
        return $this->belongsTo(Department::class, 'id_departments');
    }

    public function society()
    {
        return $this->belongsTo(Society::class, 'id_societies');
    }

    public function workhour()
    {
        return $this->belongsTo(Workhour::class, 'id_work_hours');
    }

    use HasFactory;

    protected $fillable = ['name', 'firstname', 'id_departments','id_societies','id_work_hours'];

}
