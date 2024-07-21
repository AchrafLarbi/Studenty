<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    //
    // Display a listing of the classrooms.
    public function index()
    {
        $classrooms = Classroom::with('students', 'teachers')->get(); //hnaya bach laravel yr3f bli yzid student w teacher fi api
        return response()->json($classrooms);
    }

    // Store a newly created classroom in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer',
        ]);

        $classroom = Classroom::create($validatedData);
        return response()->json($classroom, 201);
    }

    // Display the specified classroom.
    public function show($id)
    {
        $classroom = Classroom::with('students', 'teachers')->findOrFail($id);
        return response()->json($classroom);
    }

    // Update the specified classroom in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer',
        ]);

        $classroom = Classroom::findOrFail($id);
        $classroom->update($validatedData);
        return response()->json($classroom);
    }

    // Remove the specified classroom from storage.
    public function destroy($id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->delete();
        return response()->json(null, 204);
    }

    // Assign students to a classroom.
    public function assignStudents(Request $request, $id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->students()->sync($request->student_ids); //add student on the classroom as arrya of ids
        return response()->json($classroom->students);
    }

    // Assign teachers to a classroom.
    public function assignTeachers(Request $request, $id)
    {
        $classroom = Classroom::findOrFail($id);
        $classroom->teachers()->sync($request->teacher_ids);
        return response()->json($classroom->teachers);
    }
}
