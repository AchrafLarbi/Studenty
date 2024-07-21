import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import {
  selectsubjectById,
  deletesubject,
  fetchsubjectById,
} from "./subjectSlice";
import { useDispatch, useSelector } from "react-redux";
import SubjectEditForm from "./SubjectEditForm";
import { Button } from "@mui/material";

export default function SubjectDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const color = red[500];
  const { subjectId } = useParams();
  const subjectData = useSelector((state) =>
    selectsubjectById(state, parseInt(subjectId))
  );

  const [subject, setsubject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (!subjectData) {
      dispatch(fetchsubjectById(subjectId))
        .unwrap() //this unwrap return primosie of middleware
        .then((data) => {
          setsubject(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch subject:", error);
          setLoading(false);
        });
    } else {
      setsubject(subjectData);
      setLoading(false);
    }
  }, [dispatch, subjectId, subjectData]);

  // Check if subject data is still loading
  if (loading) {
    return (
      <div className="w-3/4 h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded">Loading...</div>
      </div>
    );
  }

  // Check if subject data is correctly fetched
  if (!subject) {
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
    const confirmed = confirm("Do you want to delete this subject?");

    try {
      if (confirmed) {
        await dispatch(deletesubject(subject.id)).unwrap();
        navigate("/subjects");
      }
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  }

  return (
    <div className="w-3/4 p-6 h-screen">
      {isEditing ? (
        <SubjectEditForm />
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
              src={`https://picsum.photos/200/300?random=${subject.id}`}
              alt="profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <div className="text-2xl font-semibold">{subject.name}</div>
              <div className="text-gray-500">subject ID: {subject.id}</div>
            </div>
            <Chip
              label="Delete subject"
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
              Edit subject
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1">
              <div className="text-gray-500">Code</div>
              <div>{subject.code}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
