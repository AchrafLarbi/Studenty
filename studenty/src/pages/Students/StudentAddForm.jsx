import { useState } from "react";

import { useDispatch } from "react-redux";
import { addStudent } from "./studentSlice";

import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from MUI for loading indicator

export default function StudentAddForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Add loading state
  const [student, setStuden] = useState({
    name: "",
    gender: "",
    dob: "",
    religion: "",
    bloodGroup: "",
    address: "",
    class: "",
    year: "",
    father: "",
    fatherPhone: "",
    mother: "",
    motherPhone: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStuden({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      await dispatch(addStudent(student)).unwrap();
      console.log("Student added:", student);
    } catch (error) {
      console.error("Failed to add student:", error);
    } finally {
      setLoading(false); // Reset loading state after submission is complete
    }
  };

  return (
    <div className="w-2/4 bg-white p-4 border-r m-5 rounded overflow-y-auto ">
      <div className="flex items-center mb-6">
        <div className="text-2xl font-semibold">Add New Student</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-1">
            <label className="text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Img</label>
            <input
              type="number"
              name="img"
              value={student.img}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Gender</label>
            <input
              type="text"
              name="gender"
              value={student.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Religion</label>
            <input
              type="text"
              name="religion"
              value={student.religion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={student.bloodGroup}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Address</label>
            <input
              type="text"
              name="address"
              value={student.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Year</label>
            <input
              type="text"
              name="year"
              value={student.year}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">class</label>
            <input
              type="text"
              name="class"
              value={student.class}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Father</label>
            <input
              type="text"
              name="father"
              value={student.father}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Father&apos;s Phone</label>
            <input
              type="text"
              name="fatherPhone"
              value={student.fatherPhone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Mother</label>
            <input
              type="text"
              name="mother"
              value={student.mother}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-1">
            <label className="text-gray-500">Mother&apos;s Phone</label>
            <input
              type="text"
              name="motherPhone"
              value={student.motherPhone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
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
              "Add Student"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
