import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import {
  selectClassroomById,
  deleteClassroom,
  fetchClassroomById,
} from "./classroomSlice";
import { useDispatch, useSelector } from "react-redux";
import ClassroomEditForm from "./ClassroomEditForm";
import { Button } from "@mui/material";

export default function ClassroomDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = red[500];
  const { classroomId } = useParams();
  const classroomData = useSelector((state) =>
    selectClassroomById(state, parseInt(classroomId))
  );

  const [classroom, setclassroom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (!classroomData) {
      dispatch(fetchClassroomById(classroomId))
        .unwrap() //this unwrap return primosie of middleware
        .then((data) => {
          setclassroom(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch classroom:", error);
          setLoading(false);
        });
    } else {
      setclassroom(classroomData);
      setLoading(false);
    }
  }, [dispatch, classroomId, classroomData]);

  // Check if classroom data is still loading
  if (loading) {
    return (
      <div className="w-3/4 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded">Loading...</div>
      </div>
    );
  }

  // Check if classroom data is correctly fetched
  if (!classroom) {
    return (
      <div className="w-3/4 h-screen m-auto flex items-center justify-center">
        <div className="bg-white p-6 rounded">
          <h1>
            Error fetching data, please return{" "}
            <span
              onClick={() => {
                navigate(-1);
              }}
              className="mr-10 cursor-pointer text-primary"
            >
              to home page
            </span>
          </h1>
        </div>
      </div>
    );
  }

  async function handleDelete(event) {
    event.preventDefault(); // Prevent the default form submission
    const confirmed = confirm("Do you want to delete this classroom?");

    try {
      if (confirmed) {
        await dispatch(deleteClassroom(classroom.id)).unwrap();
        navigate("/classes");
      }
    } catch (error) {
      console.error("Failed to delete classroom:", error);
    }
  }

  return (
    <div className="w-3/4 p-6 h-screen">
      {isEditing ? (
        <ClassroomEditForm />
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center mb-6">
            <KeyboardReturnIcon
              onClick={() => {
                navigate(-1);
              }}
              className="mr-10 cursor-pointer"
            ></KeyboardReturnIcon>
            <img
              src={`https://i.pravatar.cc/100?img=${classroom.id}`}
              alt="profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <div className="text-2xl font-semibold">{classroom.name}</div>
              <div className="text-gray-500">classroom ID: {classroom.id}</div>
              <div className="text-gray-500">
                classroom Year: {classroom.year}
              </div>
            </div>
            <Chip
              label="Delete classroom"
              onClick={handleDelete}
              deleteIcon={<DeleteIcon />}
              variant="outlined"
              sx={{
                background: `${color}`,
                color: "white",
                "& .MuiChip-deleteIcon": {
                  color: "white",
                },
                "& .MuiChip-deleteIcon:hover": {
                  color: "red",
                },
                "&:hover": { color: `${color}` },
              }}
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => setIsEditing(true)}
            >
              Edit classroom
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <div className="text-gray-500">Students</div>
              <ul>
                {classroom.students.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <div className="text-gray-500">Teachers</div>
              <ul>
                {classroom.teachers.map((teacher) => (
                  <li key={teacher.id}>{teacher.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
