import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import {
  selectStudentById,
  deleteStudent,
  fetchStudentById,
} from "./studentSlice";
import { useDispatch, useSelector } from "react-redux";
import StudentEditForm from "./StudentEditForm";
import { Button } from "@mui/material";

export default function StudentDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = red[500];
  const { studentId } = useParams();
  const studentData = useSelector((state) =>
    selectStudentById(state, parseInt(studentId))
  );

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [isEditing, setIsEditing] = useState(false); // Edit modal state

  useEffect(() => {
    if (!studentData) {
      dispatch(fetchStudentById(studentId))
        .unwrap()
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch student:", error);
          setLoading(false);
        });
    } else {
      setStudent(studentData);
      setLoading(false);
    }
  }, [dispatch, studentId, studentData]);

  // Check if student data is still loading
  if (loading) {
    return (
      <div className="w-3/4 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded">Loading...</div>
      </div>
    );
  }

  // Check if student data is correctly fetched
  if (!student) {
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
    const confirmed = confirm("Do you want to delete this student?");

    try {
      if (confirmed) {
        await dispatch(deleteStudent(student.id)).unwrap();
        navigate("/students");
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  }

  return (
    <div className="w-3/4 p-6 h-screen">
      <StudentEditForm
        student={student}
        open={isEditing}
        handleClose={() => setIsEditing(false)}
        onSave={(updatedStudent) => {
          setStudent(updatedStudent); // Update local state with updated student data
          setIsEditing(false);
        }}
      />
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center mb-6">
          <KeyboardReturnIcon
            onClick={() => {
              navigate(-1);
            }}
            className="mr-10 cursor-pointer"
          />
          <img
            src={`https://i.pravatar.cc/100?img=${student.img}`}
            alt="profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="text-2xl font-semibold">{student.name}</div>
            <div className="text-gray-500">
              {student.class} | Student ID: {student.id}
            </div>
          </div>
          <Chip
            label="Delete Student"
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
            Edit Student
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1">
            <div className="text-gray-500">Gender</div>
            <div>{student.gender}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Date of Birth</div>
            <div>{student.dob}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Religion</div>
            <div>{student.religion}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Blood Group</div>
            <div>{student.bloodGroup}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Address</div>
            <div>{student.address}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Year</div>
            <div>{student.year}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Father</div>
            <div>{student.father}</div>
            <div className="text-gray-500 text-sm">{student.fatherPhone}</div>
          </div>
          <div className="col-span-1">
            <div className="text-gray-500">Mother</div>
            <div>{student.mother}</div>
            <div className="text-gray-500 text-sm">{student.motherPhone}</div>
          </div>
        </div>
        <div className="flex border-b mb-4">
          <div className="flex-1 text-center p-2 border-r">Progress</div>
          <div className="flex-1 text-center p-2 border-r">Attendance</div>
          <div className="flex-1 text-center p-2 border-r">Fees History</div>
          <div className="flex-1 text-center p-2">School Bus</div>
        </div>
      </div>
    </div>
  );
}
