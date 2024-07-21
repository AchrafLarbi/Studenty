<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'class', 'year', 'img', 'dob', 'gender', 'religion',
        'bloodGroup', 'address', 'father', 'fatherPhone', 'mother', 'motherPhone'
    ];

    public function classes()
    {
        return $this->belongsToMany(Classroom::class, 'class_student');
    }

    public function attendaces()
    {
        return $this->hasMany(Attendance::class);
    }
}
