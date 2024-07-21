import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateClassroom,
  assignStudentsToClassroom,
  assignTeachersToClassroom,
  selectClassroomById,
} from "./classroomSlice";
import { selectTeachers } from "../teachers/teacherSlice";
import { selectStudents } from "../Students/studentSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function ClassFormEdit() {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const students = useSelector(selectStudents);
  const classroom = useSelector((state) =>
    selectClassroomById(state, parseInt(classroomId))
  );

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    if (classroom) {
      setName(classroom.name);
      setYear(classroom.year);
      setSelectedTeachers(classroom.teachers.map((teacher) => teacher.id));
      setSelectedStudents(classroom.students.map((student) => student.id));
    }
  }, [classroom]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(classroomId);
    const classroomData = {
      name,
      year: parseInt(year),
    };

    try {
      await dispatch(
        updateClassroom({ id: classroomId, classroomData })
      ).unwrap();

      await dispatch(
        assignStudentsToClassroom({
          classroomId: classroomId,
          studentIds: selectedStudents,
        })
      ).unwrap();

      await dispatch(
        assignTeachersToClassroom({
          classroomId: classroomId,
          teacherIds: selectedTeachers,
        })
      ).unwrap();
      window.location.reload();
      navigate("/classes");
    } catch (error) {
      console.error("Failed to update classroom:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Classroom Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            required
          />
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="teachers-label">Teachers</InputLabel>
            <Select
              labelId="teachers-label"
              multiple
              value={selectedTeachers}
              input={<OutlinedInput label="Teachers" />}
              onChange={(e) => setSelectedTeachers(e.target.value)}
              renderValue={(selected) => selected.join(",")}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  <Checkbox checked={selectedTeachers.includes(teacher.id)} />
                  <ListItemText primary={teacher.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="students-label">Students</InputLabel>
            <Select
              labelId="students-label"
              multiple
              value={selectedStudents}
              input={<OutlinedInput label="Students" />}
              onChange={(e) => setSelectedStudents(e.target.value)}
              renderValue={(selected) => selected.join(",")}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  <Checkbox checked={selectedStudents.includes(student.id)} />
                  <ListItemText primary={student.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
