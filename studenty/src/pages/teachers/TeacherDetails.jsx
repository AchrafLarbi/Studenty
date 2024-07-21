import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import {
  selectTeacherById,
  deleteTeacher,
  fetchTeacherById,
} from "./teacherSlice";
import { useDispatch, useSelector } from "react-redux";
import TeacherEditForm from "./TeacherEditForm";
import { Button } from "@mui/material";

export default function TeacherDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = red[500];
  const { teacherId } = useParams();
  const teacherData = useSelector((state) =>
    selectTeacherById(state, parseInt(teacherId))
  );

  const [teacher, setTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (!teacherData) {
      dispatch(fetchTeacherById(teacherId))
        .unwrap() //this unwrap return primosie of middleware
        .then((data) => {
          setTeacher(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch teacher:", error);
          setLoading(false);
        });
    } else {
      setTeacher(teacherData);
      setLoading(false);
    }
  }, [dispatch, teacherId, teacherData]);

  // Check if teacher data is still loading
  if (loading) {
    return (
      <div className="w-3/4 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded">Loading...</div>
      </div>
    );
  }

  // Check if teacher data is correctly fetched
  if (!teacher) {
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
    const confirmed = confirm("Do you want to delete this teacher?");

    try {
      if (confirmed) {
        await dispatch(deleteTeacher(teacher.id)).unwrap();
        navigate("/teachers");
      }
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  }

  return (
    <div className="w-3/4 p-6 h-screen">
      {isEditing ? (
        <TeacherEditForm />
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
              src={`https://i.pravatar.cc/100?img=${teacher.id}`}
              alt="profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <div className="text-2xl font-semibold">{teacher.name}</div>
              <div className="text-gray-500">
                {teacher.class} | teacher ID: {teacher.id}
              </div>
            </div>
            <Chip
              label="Delete Teacher"
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
              Edit Teacher
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <div className="text-gray-500">Subject</div>
              <div>{teacher.subject}</div>
            </div>
            <div className="col-span-1">
              <div className="text-gray-500">Phone</div>
              <div>{teacher.phone}</div>
            </div>
            <div className="col-span-1">
              <div className="text-gray-500">Email</div>
              <div>{teacher.email}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
