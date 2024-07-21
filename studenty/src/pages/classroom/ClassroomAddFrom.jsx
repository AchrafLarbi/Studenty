import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClassroom,
  assignStudentsToClassroom,
  assignTeachersToClassroom,
} from "./classroomSlice";
import { fetchTeachers, selectTeachers } from "../teachers/teacherSlice";
import { fetchStudents, selectStudents } from "../Students/studentSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { CircularProgress } from "@mui/material";

export default function ClassroomAddForm() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const students = useSelector(selectStudents);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    const classroomData = {
      name,
      year: parseInt(year),
    };

    try {
      const classroom = await dispatch(addClassroom(classroomData)).unwrap();
      const classroomId = classroom.id;

      await dispatch(
        assignStudentsToClassroom({
          classroomId,
          studentIds: selectedStudents,
        })
      ).unwrap();

      await dispatch(
        assignTeachersToClassroom({
          classroomId,
          teacherIds: selectedTeachers,
        })
      ).unwrap();

      // Reset form fields after submission
      setName("");
      setYear("");
      setSelectedTeachers([]);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Failed to create classroom:", error);
    }
    setLoading(false); // Reset loading state after submission
  };

  return (
    <div className="p-6 w-1/2 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Classroom</h2>
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
              onChange={(e) => setSelectedTeachers(e.target.value)}
              input={<OutlinedInput label="Teachers" />}
              renderValue={(selected) => selected.join(",")}
              MenuProps={MenuProps}
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
              onChange={(e) => setSelectedStudents(e.target.value)}
              input={<OutlinedInput label="Students" />}
              renderValue={(selected) => selected.join(",")}
              MenuProps={MenuProps}
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
            {loading ? (
              <CircularProgress size={24} color="inherit" className="mr-2" />
            ) : (
              "Add Classroom"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
