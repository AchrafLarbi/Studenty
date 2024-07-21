<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\TimeSlotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// users
Route::get('/users', [UserController::class, 'index']);
Route::post('/registre', [UserController::class, 'registre']);
Route::get('/users/{id}', [UserController::class, 'show']);

// authentication
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

// students
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/{id}', [StudentController::class, 'show']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
Route::patch('/students/{id}', [StudentController::class, 'update']);

//teachers
Route::get('/teachers', [TeacherController::class, 'index']);
Route::post('/teachers', [TeacherController::class, 'store']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::patch('/teachers/{id}', [TeacherController::class, 'update']);
Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);


//classroom
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/classes', [ClassroomController::class, 'index']);
    Route::post('/classes', [ClassroomController::class, 'store']);
    Route::get('/classes/{id}', [ClassroomController::class, 'show']);
    Route::patch('/classes/{id}', [ClassroomController::class, 'update']);
    Route::delete('/classes/{id}', [ClassroomController::class, 'destroy']);
    Route::post('/classes/{id}/students', [ClassroomController::class, 'assignStudents']);
    Route::post('/classes/{id}/teachers', [ClassroomController::class, 'assignTeachers']);
});

//subjects
Route::get('/subjects', [SubjectController::class, 'index']);
Route::post('/subjects', [SubjectController::class, 'store']);
Route::get('/subjects/{id}', [SubjectController::class, 'show']);
Route::patch('/subjects/{id}', [SubjectController::class, 'update']);
Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
Route::post('/subjects/{id}/classes', [SubjectController::class, 'assignToClass']);
Route::post('/subjects/{id}/teachers', [SubjectController::class, 'assignToTeacher']);

Route::get('/attendances', [AttendanceController::class, 'index']);
Route::post('/attendances', [AttendanceController::class, 'store']);
Route::get('/attendances/{id}', [AttendanceController::class, 'show']);
Route::patch('/attendances/{id}', [AttendanceController::class, 'update']);
Route::delete('/attendances/{id}', [AttendanceController::class, 'destroy']);
Route::get('/attendances/student/{student_id}', [AttendanceController::class, 'studentReport']);
Route::post('/attendances/report', [AttendanceController::class, 'report']);

//timetables
Route::apiResource('timetables', TimetableController::class)->parameters([
    'timetables' => 'id'
]);
Route::get('/timetables/{id}/time-slots', [TimetableController::class, 'timeSlots']);

//time slots
Route::get('/time-slots', [TimeSlotController::class, 'index']);
Route::post('/time-slots', [TimeSlotController::class, 'store']);
Route::get('/time-slots/{id}', [TimeSlotController::class, 'show']);
Route::patch('/time-slots/{id}', [TimeSlotController::class, 'update']);
Route::delete('/time-slots/{id}', [TimeSlotController::class, 'destroy']);
Route::get('/time-slots/timetable/{timetable_id}', [TimeSlotController::class, 'timetable']);
