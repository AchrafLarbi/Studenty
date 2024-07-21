import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import teacherReducer from "../teachers/teacherSlice";
import subjectReducer from "../subjects/subjectSlice";
import classroomReducer from "../classroom/classroomSlice";
import authReducer from "../auth/AuthSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    teacher: teacherReducer,
    subject: subjectReducer,

    auth: authReducer,
    classroom: classroomReducer,

    // Add other reducers as needed
  },
});
