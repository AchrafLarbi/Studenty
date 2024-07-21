<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'year',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class, 'class_student')->as('classroom_students'); //this take 2 arguest first is the model and the seocnd is where stioe data in pivot tables
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'class_teacher')->as('classroom_teachers');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'class_subject')->as('classroom_subjects');
    }
}
