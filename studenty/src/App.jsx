import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import ErrorPage from "./pages/errorPage";
import Student from "./pages/Students/student";
import Index from "./pages/dashboard/Index";
import StudentDetails from "./pages/Students/StudentDetails";
import Teacher from "./pages/teachers/Teacher";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import Subject from "./pages/subjects/Subject";
import SubjectDetails from "./pages/subjects/SubjectDetails";
import Classroom from "./pages/classroom/classroom";
import ClassroomDetails from "./pages/classroom/classroomDetails";
import Login from "./pages/auth/Login";
import PrivateRoute from "./pages/auth/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // Protect routes under PrivateRoute
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "students",
            element: <Student />,
          },
          {
            path: "students/:studentId",
            element: <StudentDetails />,
          },
          {
            path: "teachers",
            element: <Teacher />,
          },
          {
            path: "teachers/:teacherId",
            element: <TeacherDetails />,
          },
          {
            path: "subjects",
            element: <Subject />,
          },
          {
            path: "subjects/:subjectId",
            element: <SubjectDetails />,
          },
          {
            path: "classes",
            element: <Classroom />,
          },
          {
            path: "classes/:classroomId",
            element: <ClassroomDetails />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
