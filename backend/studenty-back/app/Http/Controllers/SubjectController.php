<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    // Display a listing of the subjects.
    public function index()
    {
        $subjects = Subject::with('classes', 'teachers')->get();
        return response()->json($subjects);
    }

    // Store a newly created subject in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects',
        ]);

        $subject = Subject::create($validatedData);
        return response()->json($subject, 201);
    }

    // Display the specified subject.
    public function show($id)
    {
        $subject = Subject::with('classes', 'teachers')->findOrFail($id);
        return response()->json($subject);
    }

    // Update the specified subject in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:subjects,code,' . $id,
        ]);

        $subject = Subject::findOrFail($id);
        $subject->update($validatedData);
        return response()->json($subject);
    }

    // Remove the specified subject from storage.
    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);
        $subject->delete();
        return response()->json(null, 204);
    }

    // Assign subjects to a class.
    public function assignToClass(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->classes()->syncWithoutDetaching($request->classroom_ids);
        return response()->json($subject->classes);
    }

    // Assign subjects to a teacher.
    public function assignToTeacher(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $subject->teachers()->syncWithoutDetaching($request->teacher_ids);
        return response()->json($subject->teachers);
    }
}
