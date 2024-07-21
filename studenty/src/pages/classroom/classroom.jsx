import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import Header from "../dashboard/Header";
import { selectClassrooms, fetchClassrooms } from "./classroomSlice";
import ClassroomAddForm from "./ClassroomAddFrom";

const Classroom = () => {
  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassrooms);
  const classroomStatus = useSelector((state) => state.classroom.status);
  const error = useSelector((state) => state.classroom.error);

  const [searchValue, setSearchValue] = useState("");
  const [filteredclassrooms, setFilteredclassrooms] = useState(classrooms);

  const previousclassroomIdRef = useRef(null);
  const [previousclassroomId, setPreviousclassroomId] = useState(
    previousclassroomIdRef
  );

  console.log(classrooms);

  const handleSearch = useCallback(() => {
    if (searchValue === "") {
      setFilteredclassrooms(classrooms);
    } else {
      const filtered = classrooms.filter(
        (classroom) =>
          classroom.id.toString().includes(searchValue) ||
          classroom.name.toLowerCase().includes(searchValue)
      );
      setFilteredclassrooms(filtered);
    }
  }, [searchValue, classrooms]);

  useEffect(() => {
    //search
    handleSearch();
    //use ref
    const previousclassroomId = localStorage.getItem("previousclassroomId");
    previousclassroomIdRef.current = parseInt(previousclassroomId);
    setPreviousclassroomId(previousclassroomIdRef.current);
    //fetch
    if (classroomStatus === "idle") {
      dispatch(fetchClassrooms());
    }
  }, [handleSearch, classroomStatus, dispatch]);

  return (
    <div className="w-3/4 flex flex-col h-screen overflow-auto ">
      <Header header={"classroom"} />
      {/* classroom List */}
      <div className="flex flex-row">
        <div
          className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto "
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for classrooms or ID"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
          </div>
          {classroomStatus === "loading" && <div>Loading...</div>}
          {classroomStatus === "failed" && <div>Error: {error}</div>}
          <ul>
            {classroomStatus === "succeeded" && filteredclassrooms.length
              ? filteredclassrooms.map((classroom) => (
                  <li key={classroom.id}>
                    <NavLink
                      className={`flex items-center p-2 my-2 rounded ${
                        previousclassroomId === classroom.id
                          ? "bg-gray-200"
                          : ""
                      }`}
                      to={`/classes/${classroom.id}`}
                      onClick={() =>
                        localStorage.setItem(
                          "previousclassroomId",
                          classroom.id.toString()
                        )
                      }
                    >
                      <div>
                        <div className="font-semibold">{classroom.name}</div>
                        <div className="text-gray-500 text-sm">
                          {classroom.year}
                        </div>
                      </div>
                      <div className="ml-auto text-gray-500 text-sm">
                        {classroom.id}
                      </div>
                    </NavLink>
                  </li>
                ))
              : classroomStatus === "succeeded" && (
                  <div className=" text-black text-xl text-center">
                    no classroom here
                  </div>
                )}
          </ul>
        </div>

        <ClassroomAddForm />
      </div>
    </div>
  );
};

export default Classroom;
