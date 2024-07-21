import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectsubjectById, updatesubject } from "./subjectSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function SubjectEditForm() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subjectData = useSelector((state) =>
    selectsubjectById(state, parseInt(subjectId))
  );

  const [subject, setsubject] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    if (subjectData) {
      setsubject({
        name: subjectData.name,
        code: subjectData.code,
      });
    }
  }, [subjectData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatesubject({ id: subjectId, subject })).unwrap();
      navigate(`/subjects/`);
    } catch (error) {
      console.error("Failed to update subject:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, background: "white", p: 2, borderRadius: 1 }}
    >
      <Typography component="h1" variant="h5">
        Edit subject
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={subject.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="code"
        label="Code"
        name="code"
        value={subject.code}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save Changes
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
        onClick={() => navigate(-1)}
      >
        Cancel
      </Button>
    </Box>
  );
}
