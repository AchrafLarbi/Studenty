<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TimeSlot;

class TimeSlotController extends Controller
{
    //

    public function index()
    {
        $timeSlots = TimeSlot::with('subject', 'teacher')->get();
        return response()->json($timeSlots);
    }

    public function show($id)
    {
        $timeSlot = TimeSlot::with('subject', 'teacher')->find($id);
        return response()->json($timeSlot);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'timetable_id' => 'required|exists:timetables,id',
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
        ]);

        $timeSlot = TimeSlot::create($validatedData);
        return response()->json($timeSlot, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'timetable_id' => 'sometimes|exists:timetables,id',
            'day_of_week' => 'sometimes|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i',
            'subject_id' => 'sometimes|exists:subjects,id',
            'teacher_id' => 'sometimes|exists:teachers,id',
        ]);

        $timeSlot = TimeSlot::findOrFail($id);
        $timeSlot->update($validatedData);
        return response()->json($timeSlot);
    }

    public function destroy($id)
    {
        $timeSlot = TimeSlot::findOrFail($id);
        $timeSlot->delete();
        return response()->json(['message' => 'you delete time slot successful'], 204);
    }

    public function timetable($id)
    {
        $timeSlot = TimeSlot::findOrFail($id);
        $timetable = $timeSlot->timetable;
        return response()->json($timetable);
    }
}
