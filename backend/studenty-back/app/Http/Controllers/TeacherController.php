<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    // Display a listing of the teachers.
    public function index()
    {
        $teachers = Teacher::all();
        return response()->json($teachers);
    }

    // Store a newly created teacher in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:teachers',
            'phone' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
        ]);

        $teacher = Teacher::create($validatedData);
        return response()->json($teacher, 201);
    }

    // Display the specified teacher.
    public function show($id)
    {
        $teacher = Teacher::findOrFail($id);
        return response()->json($teacher);
    }

    //update the specified teacher
    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:teachers,email,' . $id, //unique for update 
            'phone' => 'sometimes|string|max:255',
            'subject' => 'sometimes|string|max:255',
        ]);

        $teacher->update($validatedData);
        return response()->json($teacher);
    }

    // Remove the specified teacher from storage.
    public function destroy($id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->delete();
        return response()->json(null, 204);
    }
}
