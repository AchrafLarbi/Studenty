import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/api";

// Async thunks for CRUD operations
export const fetchClassrooms = createAsyncThunk(
  "classrooms/fetchClassrooms",
  async () => {
    const response = await api.get("http://localhost:8000/api/classes");
    return response.data;
  }
);

export const addClassroom = createAsyncThunk(
  "classrooms/addClassroom",
  async (classroom) => {
    const response = await api.post(
      "http://localhost:8000/api/classes",
      classroom
    );
    return response.data;
  }
);

export const fetchClassroomById = createAsyncThunk(
  "student/fetchStudentById",
  async (id) => {
    const response = await api.get(`http://localhost:8000/api/classes/${id}`);
    return response.data;
  }
);

export const updateClassroom = createAsyncThunk(
  "classrooms/updateClassroom",
  async ({ id, classroomData }) => {
    const response = await api.patch(
      `http://localhost:8000/api/classes/${id}`,
      classroomData
    );
    return response.data;
  }
);

export const deleteClassroom = createAsyncThunk(
  "classrooms/deleteClassroom",
  async (classroomId) => {
    await api.delete(`http://localhost:8000/api/classes/${classroomId}`);
    return classroomId;
  }
);

export const assignStudentsToClassroom = createAsyncThunk(
  "classrooms/assignStudentsToClassroom",
  async ({ classroomId, studentIds }) => {
    const response = await api.post(
      `http://localhost:8000/api/classes/${classroomId}/students`,
      {
        student_ids: studentIds,
      }
    );
    return { classroomId, students: response.data };
  }
);

export const assignTeachersToClassroom = createAsyncThunk(
  "classrooms/assignTeachersToClassroom",
  async ({ classroomId, teacherIds }) => {
    const response = await api.post(
      `http://localhost:8000/api/classes/${classroomId}/teachers`,
      {
        teacher_ids: teacherIds,
      }
    );
    return { classroomId, teachers: response.data };
  }
);

const classroomsSlice = createSlice({
  name: "classrooms",
  initialState: {
    classrooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchClassrooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classrooms = action.payload;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addClassroom.fulfilled, (state, action) => {
        state.classrooms.push(action.payload);
      })

      .addCase(updateClassroom.fulfilled, (state, action) => {
        const index = state.classrooms.findIndex(
          (classroom) => classroom.id === action.payload.id
        );
        if (index !== -1) {
          state.classrooms[index] = action.payload;
        }
      })

      .addCase(deleteClassroom.fulfilled, (state, action) => {
        state.classrooms = state.classrooms.filter(
          (classroom) => classroom.id !== action.payload
        );
      })
      .addCase(assignStudentsToClassroom.fulfilled, (state, action) => {
        const { classroomId, students } = action.payload;
        const classroom = state.classrooms.find(
          (classroom) => classroom.id === classroomId
        );
        if (classroom) {
          classroom.students = students;
        }
      })

      .addCase(assignTeachersToClassroom.fulfilled, (state, action) => {
        const { classroomId, teachers } = action.payload;
        const classroom = state.classrooms.find(
          (classroom) => classroom.id === classroomId
        );
        if (classroom) {
          classroom.teachers = teachers;
        }
      })

      .addCase(fetchClassroomById.fulfilled, (state, action) => {
        const index = state.classrooms.findIndex(
          (classroom) => classroom.id === action.payload.id
        );
        state.classrooms[index] = action.payload;
      });
  },
});

export const selectClassrooms = (state) => state.classroom.classrooms;
export const selectClassroomById = (state, classroomId) =>
  state.classroom.classrooms.find((classroom) => classroom.id === classroomId);

export default classroomsSlice.reducer;
