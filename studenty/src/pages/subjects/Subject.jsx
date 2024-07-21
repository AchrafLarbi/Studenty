import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../dashboard/Header";
import { selectsubjects, fetchsubjects } from "../subjects/subjectSlice";
import SubjectAddForm from "./SubjectAddForm";

const Subject = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(selectsubjects);
  const subjectStatus = useSelector((state) => state.subject.status);
  const error = useSelector((state) => state.subject.error);

  const [searchValue, setSearchValue] = useState("");
  const [filteredsubjects, setFilteredsubjects] = useState(subjects);

  const previoussubjectIdRef = useRef(null);
  const [previoussubjectId, setPrevioussubjectId] =
    useState(previoussubjectIdRef);

  const handleSearch = useCallback(() => {
    if (searchValue === "") {
      setFilteredsubjects(subjects);
    } else {
      const filtered = subjects.filter(
        (subject) =>
          subject.id.toString().includes(searchValue) ||
          subject.name.toLowerCase().includes(searchValue)
      );
      setFilteredsubjects(filtered);
    }
  }, [searchValue, subjects]);

  useEffect(() => {
    //search
    handleSearch();
    //use ref
    const previoussubjectId = localStorage.getItem("previoussubjectId");
    previoussubjectIdRef.current = parseInt(previoussubjectId);
    setPrevioussubjectId(previoussubjectIdRef.current);
    //fetch
    if (subjectStatus === "idle") {
      dispatch(fetchsubjects());
    }
  }, [handleSearch, subjectStatus, dispatch]);

  return (
    <div className="w-3/4 flex flex-col h-screen">
      <Header header={"subject"} />
      {/* subject List */}
      <div className="flex flex-row">
        <div
          className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto "
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for subjects or ID"
              className="w-full p-2 border rounded"
              onChange={(e) => {
                setSearchValue(e.target.value.toLowerCase());
              }}
            />
          </div>
          {subjectStatus === "loading" && <div>Loading...</div>}
          {subjectStatus === "failed" && <div>Error: {error}</div>}
          <ul>
            {subjectStatus === "succeeded" && filteredsubjects.length
              ? filteredsubjects.map((subject) => (
                  <li key={subject.id}>
                    <NavLink
                      className={`flex items-center p-2 my-2 rounded ${
                        previoussubjectId === subject.id ? "bg-gray-200" : ""
                      }`}
                      to={`/subjects/${subject.id}`}
                      onClick={() =>
                        localStorage.setItem(
                          "previoussubjectId",
                          subject.id.toString()
                        )
                      }
                    >
                      <div>
                        <div className="font-semibold">{subject.name}</div>
                        <div className="text-gray-500 text-sm">
                          {subject.code}
                        </div>
                      </div>
                      <div className="ml-auto text-gray-500 text-sm">
                        {subject.id}
                      </div>
                    </NavLink>
                  </li>
                ))
              : subjectStatus === "succeeded" && (
                  <div className=" text-black text-xl text-center">
                    no subject here
                  </div>
                )}
          </ul>
        </div>
        <SubjectAddForm />
      </div>
    </div>
  );
};

export default Subject;
