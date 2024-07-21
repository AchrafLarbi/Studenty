<?php

namespace App\Http\Controllers;

use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    //

    public function index()
    {
        $timetables = Timetable::all();
        return response()->json($timetables);
    }

    public function show($id)
    {
        $timetable = Timetable::find($id);
        return response()->json($timetable);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'classroom_id' => 'required|exists:classrooms,id',
        ]);

        $timetable = Timetable::create($validatedData);
        return response()->json($timetable, 201);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'classroom_id' => 'sometimes|exists:classrooms,id',
        ]);

        $timetable = Timetable::findOrFail($id);
        $timetable->update($validatedData);
        return response()->json($timetable);
    }

    public function destroy($id)
    {
        $timetable = Timetable::findOrFail($id);
        $timetable->delete();
        return response()->json(['message' => 'you delete timetable successful'], 204);
    }

    public function timeSlots($id)
    {
        $timetable = Timetable::findOrFail($id);
        $timeSlots = $timetable->timeSlots;
        return response()->json($timeSlots);
    }
}
