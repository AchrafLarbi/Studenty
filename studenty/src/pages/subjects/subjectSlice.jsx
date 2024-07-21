import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async actions
export const fetchsubjects = createAsyncThunk(
  "subjects/fetchsubjects",
  async () => {
    const response = await axios.get("http://localhost:8000/api/subjects");
    return response.data;
  }
);

export const fetchsubjectById = createAsyncThunk(
  "subjects/fetchsubjectById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/subjects/${id}`
    );
    return response.data;
  }
);

export const addsubject = createAsyncThunk(
  "subjects/addsubject",
  async (subject) => {
    const response = await axios.post(
      "http://localhost:8000/api/subjects",
      subject
    );
    return response.data;
  }
);

export const updatesubject = createAsyncThunk(
  "subjects/updatesubject",
  async ({ id, subject }) => {
    const response = await axios.patch(
      `http://localhost:8000/api/subjects/${id}`,
      subject
    );
    return response.data;
  }
);

export const deletesubject = createAsyncThunk(
  "subjects/deletesubject",
  async (id) => {
    await axios.delete(`http://localhost:8000/api/subjects/${id}`);
    return id;
  }
);

const subjectslice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchsubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchsubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
      })
      .addCase(fetchsubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addsubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      .addCase(updatesubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(
          (subject) => subject.id === action.payload.id
        );
        state.subjects[index] = action.payload;
      })
      .addCase(deletesubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(
          (subject) => subject.id !== action.payload
        );
      })
      .addCase(fetchsubjectById.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(
          (subject) => subject.id === action.payload.id
        );
        state.subjects[index] = action.payload;
      });
  },
});

export default subjectslice.reducer;
export const selectsubjects = (state) => state.subject.subjects;
export const selectsubjectById = (state, subjectId) =>
  state.subject.subjects.find((subject) => subject.id === subjectId);
