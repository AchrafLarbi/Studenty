<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Display a listing of the students.
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    // Store a newly created student in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'class' => 'required|string|max:255',
            'year' => 'required|integer',
            'img' => 'nullable|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|string|max:255',
            'religion' => 'required|string|max:255',
            'bloodGroup' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'father' => 'required|string|max:255',
            'fatherPhone' => 'required|string|max:255',
            'mother' => 'required|string|max:255',
            'motherPhone' => 'required|string|max:255',
        ]);

        $student = Student::create($validatedData);
        return response()->json($student, 201);
    }

    // Display the specified student.
    public function show($id)
    {
        $student = Student::findOrFail($id);
        return response()->json($student);
    }

    //delete the specified student
    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $student->delete();
        return response()->json($student);
    }

    //update partial
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'class' => 'sometimes|required|string|max:255',
            'year' => 'sometimes|required|integer',
            'img' => 'sometimes|nullable|string|max:255',
            'dob' => 'sometimes|required|date',
            'gender' => 'sometimes|required|string|max:255',
            'religion' => 'sometimes|required|string|max:255',
            'bloodGroup' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string|max:255',
            'father' => 'sometimes|required|string|max:255',
            'fatherPhone' => 'sometimes|required|string|max:255',
            'mother' => 'sometimes|required|string|max:255',
            'motherPhone' => 'sometimes|required|string|max:255',
        ]);

        $student->update($validatedData);
        return response()->json($student);
    }
}
