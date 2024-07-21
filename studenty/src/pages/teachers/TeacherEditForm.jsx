import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectTeacherById, updateTeacher } from "./teacherSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function TeacherEditForm() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacherData = useSelector((state) =>
    selectTeacherById(state, parseInt(teacherId))
  );

  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (teacherData) {
      setTeacher({
        name: teacherData.name,
        subject: teacherData.subject,
        phone: teacherData.phone,
        email: teacherData.email,
      });
    }
  }, [teacherData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTeacher({ id: teacherId, teacher })).unwrap();
      navigate(`/teachers/`);
    } catch (error) {
      console.error("Failed to update teacher:", error);
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
        Edit Teacher
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={teacher.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="subject"
        label="Subject"
        name="subject"
        value={teacher.subject}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone"
        name="phone"
        value={teacher.phone}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        value={teacher.email}
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
