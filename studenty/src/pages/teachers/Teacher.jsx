import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../dashboard/Header";
import { selectTeachers, fetchTeachers } from "../teachers/teacherSlice";
import TeacherAddForm from "./TeacherForm";

const Teacher = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const teacherStatus = useSelector((state) => state.teacher.status);
  const error = useSelector((state) => state.teacher.error);

  const [searchValue, setSearchValue] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);

  const previousTeacherIdRef = useRef(null);
  const [previousTeacherId, setPreviousTeacherId] =
    useState(previousTeacherIdRef);

  const handleSearch = useCallback(() => {
    if (searchValue === "") {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.id.toString().includes(searchValue) ||
          teacher.name.toLowerCase().includes(searchValue)
      );
      setFilteredTeachers(filtered);
    }
  }, [searchValue, teachers]);

  useEffect(() => {
    //search
    handleSearch();
    //use ref
    const previousTeacherId = localStorage.getItem("previousTeacherId");
    previousTeacherIdRef.current = parseInt(previousTeacherId);
    setPreviousTeacherId(previousTeacherIdRef.current);
    //fetch
    if (teacherStatus === "idle") {
      dispatch(fetchTeachers());
    }
  }, [handleSearch, teacherStatus, dispatch]);

  const generateRandomNumber = (int) => {
    return Math.floor(Math.random() * int);
  };

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <Header header={"teacher"} />
      {/* Teacher List */}
      <div className="flex flex-row">
        <div
          className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto "
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for teachers or ID"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
          </div>
          {teacherStatus === "loading" && <div>Loading...</div>}
          {teacherStatus === "failed" && <div>Error: {error}</div>}
          <ul>
            {teacherStatus === "succeeded" && filteredTeachers.length
              ? filteredTeachers.map((teacher) => (
                  <li key={teacher.id}>
                    <NavLink
                      className={`flex items-center p-2 my-2 rounded ${
                        previousTeacherId === teacher.id ? "bg-gray-200" : ""
                      }`}
                      to={`/teachers/${teacher.id}`}
                      onClick={() =>
                        localStorage.setItem(
                          "previousTeacherId",
                          teacher.id.toString()
                        )
                      }
                    >
                      <img
                        src={`https://i.pravatar.cc/40?img=${generateRandomNumber(
                          teacher.id
                        )}`}
                        alt="teacher"
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-semibold">{teacher.name}</div>
                        <div className="text-gray-500 text-sm">
                          {teacher.subject}
                        </div>
                      </div>
                      <div className="ml-auto text-gray-500 text-sm">
                        {teacher.id}
                      </div>
                    </NavLink>
                  </li>
                ))
              : teacherStatus === "succeeded" && (
                  <div className=" text-black text-xl text-center">
                    no teacher here
                  </div>
                )}
          </ul>
        </div>
        <TeacherAddForm />
      </div>
    </div>
  );
};

export default Teacher;
