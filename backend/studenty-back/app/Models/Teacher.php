<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'subject',
    ];

    public function classes()
    {
        return $this->belongsToMany(Classroom::class, 'class_teacher');
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subject_teacher');
    }
}
