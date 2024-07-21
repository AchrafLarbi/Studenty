import { useState } from "react";

import { useDispatch } from "react-redux";
import { addsubject } from "./subjectSlice";

import CircularProgress from "@mui/material/CircularProgress";

export default function SubjectAddForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [subject, setsubject] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsubject({ ...subject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addsubject(subject)).unwrap();
      console.log("subject added:", subject);
    } catch (error) {
      console.error("Failed to add subject:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto ">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-semibold">Add New subject</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1">
            <label className="text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Code</label>
            <input
              type="text"
              name="code"
              value={subject.code}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" className="mr-2" />
            ) : (
              "Add subject"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
