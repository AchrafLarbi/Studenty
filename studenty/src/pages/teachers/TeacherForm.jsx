import { useState } from "react";

import { useDispatch } from "react-redux";
import { addTeacher } from "./teacherSlice";

import CircularProgress from "@mui/material/CircularProgress";

export default function TeacherAddForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    name: "",
    subject: "",
    phone: "", // Add phone field
    email: "", // Add email field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addTeacher(teacher)).unwrap();
      console.log("Teacher added:", teacher);
    } catch (error) {
      console.error("Failed to add teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto ">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-semibold">Add New Teacher</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1">
            <label className="text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Subject</label>
            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={teacher.email}
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
              "Add Teacher"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
