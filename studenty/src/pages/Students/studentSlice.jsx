import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const students = [
//   {
//     id: 1,
//     name: "Amara Olson",
//     class: "VI",
//     year: 2019,
//     img: "1",
//     dob: "01-01-2005",
//     gender: "Female",
//     religion: "Christian",
//     bloodGroup: "A+",
//     address: "123 Main St",
//     father: "John Olson",
//     fatherPhone: "+1234567890",
//     mother: "Jane Olson",
//     motherPhone: "+0987654321",
//   },
//   {
//     id: 2,
//     name: "Julie Von",
//     class: "VI",
//     year: 2020,
//     img: "2",
//     dob: "02-02-2006",
//     gender: "Female",
//     religion: "Christian",
//     bloodGroup: "B+",
//     address: "456 Oak St",
//     father: "Mark Von",
//     fatherPhone: "+2345678901",
//     mother: "Mary Von",
//     motherPhone: "+8765432109",
//   },
//   // ... Add more student data as needed
//   {
//     id: 3,
//     name: "Jocelyn Walker",
//     class: "VI",
//     year: 2016,
//     img: "3",
//     dob: "03-03-2007",
//     gender: "Female",
//     religion: "Christian",
//     bloodGroup: "AB+",
//     address: "789 Pine St",
//     father: "Luke Walker",
//     fatherPhone: "+3456789012",
//     mother: "Sara Walker",
//     motherPhone: "+7654321098",
//   },
//   {
//     id: 4,
//     name: "Jaiden Zulauf",
//     class: "VI",
//     year: 2019,
//     img: "4",
//     dob: "04-04-2008",
//     gender: "Male",
//     religion: "Christian",
//     bloodGroup: "O+",
//     address: "101 Maple St",
//     father: "Adam Zulauf",
//     fatherPhone: "+4567890123",
//     mother: "Eve Zulauf",
//     motherPhone: "+6543210987",
//   },
//   {
//     id: 5,
//     name: "Trisha Berge",
//     class: "VI",
//     year: 2018,
//     img: "5",
//     dob: "29-04-2004",
//     gender: "Female",
//     religion: "Christian",
//     bloodGroup: "B+",
//     address: "1962 Harrison St, San Francisco, CA 94103",
//     father: "Richard Berge",
//     fatherPhone: "+16039654668",
//     mother: "Maren Berge",
//     motherPhone: "+16606877027",
//   },
//   // ... Add more student data as needed
// ];

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const response = await axios.get("http://localhost:8000/api/students");
    return response.data;
  }
);

export const fetchStudentById = createAsyncThunk(
  "student/fetchStudentById",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/students/${id}`
    );
    return response.data;
  }
);
export const addStudent = createAsyncThunk(
  "student/addStudent",
  async (student) => {
    const response = await axios.post(
      "http://localhost:8000/api/students",
      student
    );
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ id, formData }) => {
    const response = await axios.patch(
      `http://localhost:8000/api/students/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id) => {
    await axios.delete(`http://localhost:8000/api/students/${id}`);
    return id;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder //first one for fethcstudents
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) //this is for add new student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      }) //this for update
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        state.students[index] = action.payload;
      }) //this is for delete one
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student.id === action.payload.id
        );
        state.students[index] = action.payload;
      });
  },
});

export const selectStudents = (state) => state.student.students;
export const selectStudentById = (state, studentId) =>
  state.student.students.find((student) => student.id === studentId);

export default studentSlice.reducer;
