/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudent } from "./studentSlice";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const StudentEditForm = ({ student, open, handleClose, onSave }) => {
  const { studentId } = useParams();
  const [formData, setFormData] = useState({ ...student });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("Form data:", formData);
    e.preventDefault();
    try {
      const updatedStudent = await dispatch(
        updateStudent({ id: studentId, formData })
      ).unwrap();
      console.log("Updated student:", updatedStudent);
      onSave(updatedStudent); // Call the onSave callback with the updated student data
      handleClose();
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Religion"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Father"
          name="father"
          value={formData.father}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Father Phone"
          name="fatherPhone"
          value={formData.fatherPhone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Mother"
          name="mother"
          value={formData.mother}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Mother Phone"
          name="motherPhone"
          value={formData.motherPhone}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentEditForm;
