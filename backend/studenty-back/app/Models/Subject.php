<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'code',
    ];

    public function classes()
    {
        return $this->belongsToMany(Classroom::class, 'class_subject')->withTimestamps()->as('subject_classes'); //this take 2 arguest first is the model and the seocnd is where stioe data in pivot tables
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'subject_teacher')->withTimestamps()->as('subject_teachers');
    }
}
