import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import Header from "../dashboard/Header";
import { selectStudents, fetchStudents } from "./studentSlice";
import StudentAddForm from "./StudentAddForm";

const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectStudents);
  const studentStatus = useSelector((state) => state.student.status);
  const error = useSelector((state) => state.student.error);

  const [searchValue, setSearchValue] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  const previousStudentIdRef = useRef(null);
  const [previousStudentId, setPreviousStudentId] =
    useState(previousStudentIdRef);

  console.log(students);

  const handleSearch = useCallback(() => {
    if (searchValue === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.id.toString().includes(searchValue) ||
          student.name.toLowerCase().includes(searchValue)
      );
      setFilteredStudents(filtered);
    }
  }, [searchValue, students]);

  useEffect(() => {
    //search
    handleSearch();
    //use ref
    const previousStudentId = localStorage.getItem("previousStudentId");
    previousStudentIdRef.current = parseInt(previousStudentId);
    setPreviousStudentId(previousStudentIdRef.current);
    //fetch
    if (studentStatus === "idle") {
      dispatch(fetchStudents());
    }
  }, [handleSearch, studentStatus, dispatch]);

  return (
    <div className="w-3/4 flex flex-col ">
      <Header header={"student"} />
      {/* Student List */}
      <div className="flex flex-row">
        <div
          className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto "
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for students or ID"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
          </div>
          {studentStatus === "loading" && <div>Loading...</div>}
          {studentStatus === "failed" && <div>Error: {error}</div>}
          <ul>
            {studentStatus === "succeeded" && filteredStudents.length
              ? filteredStudents.map((student) => (
                  <li key={student.id}>
                    <NavLink
                      className={`flex items-center p-2 my-2 rounded ${
                        previousStudentId === student.id ? "bg-gray-200" : ""
                      }`}
                      to={`/students/${student.id}`}
                      onClick={() =>
                        localStorage.setItem(
                          "previousStudentId",
                          student.id.toString()
                        )
                      }
                    >
                      <img
                        src={`https://i.pravatar.cc/40?img=${student.img}`}
                        alt="student"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold">{student.name}</div>
                        <div className="text-gray-500 text-sm">
                          {student.class}
                        </div>
                      </div>
                      <div className="ml-auto text-gray-500 text-sm">
                        {student.id}
                      </div>
                    </NavLink>
                  </li>
                ))
              : studentStatus === "succeeded" && (
                  <div className=" text-black text-xl text-center">
                    no student here
                  </div>
                )}
          </ul>
        </div>
        <StudentAddForm />
      </div>
    </div>
  );
};

export default Student;
