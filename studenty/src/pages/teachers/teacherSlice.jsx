import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get("http://localhost:8000/api/teachers");
    return response.data;
  }
);

export const fetchTeacherById = createAsyncThunk(
  "teachers/fetchTeacherById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/teachers/${id}`
    );
    return response.data;
  }
);

export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (teacher) => {
    const response = await axios.post(
      "http://localhost:8000/api/teachers",
      teacher
    );
    return response.data;
  }
);

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, teacher }) => {
    const response = await axios.patch(
      `http://localhost:8000/api/teachers/${id}`,
      teacher
    );
    return response.data;
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    await axios.delete(`http://localhost:8000/api/teachers/${id}`);
    return id;
  }
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(
          (teacher) => teacher.id === action.payload.id
        );
        state.teachers[index] = action.payload;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(
          (teacher) => teacher.id === action.payload.id
        );
        state.teachers[index] = action.payload;
      });
  },
});

export default teacherSlice.reducer;
export const selectTeachers = (state) => state.teacher.teachers;
export const selectTeacherById = (state, teacherId) =>
  state.teacher.teachers.find((teacher) => teacher.id === teacherId);
