<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::with(['student:id,name'])->get();
        return response()->json($attendances);
    }

    // Store a newly created attendance record in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id', //verify id in student table exist
            'date' => 'required|date',
            'status' => 'required|in:present,absent,late',
        ]);

        $attendance = Attendance::create($validatedData);
        return response()->json($attendance, 201);
    }

    // Display the specified attendance record.
    public function show($id)
    {
        $attendance = Attendance::with('student')->findOrFail($id);
        return response()->json($attendance);
    }

    // Update the specified attendance record in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:present,absent,late',
        ]);

        $attendance = Attendance::findOrFail($id);
        $attendance->update($validatedData);
        return response()->json($attendance);
    }

    // Remove the specified attendance record from storage.
    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();
        return response()->json(null, 204);
    }

    public function studentReport($student_id)
    {
        $attendances = Attendance::where('student_id', $student_id)->get();
        return response()->json($attendances);
    }

    // Generate attendance report for all students within a date range
    public function report(Request $request)
    {
        $validatedData = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $attendances = Attendance::with('student:id,name')
            ->whereBetween('date', [$validatedData['start_date'], $validatedData['end_date']])
            ->get();

        return response()->json($attendances);
    }
}
