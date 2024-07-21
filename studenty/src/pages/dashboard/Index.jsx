import studentIcons from "../../icons/graduate.png";
import TeacherIcon from "../../icons/teacher.png";
import EarnIcon from "../../icons/earnings.png";
import parentIcon from "../../icons/parents.png";
import EventCalendar from "./EventCalendar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectStudents } from "../Students/studentSlice";
import { selectTeachers } from "../teachers/teacherSlice";

export default function Index() {
  const student = useSelector(selectStudents);
  const teacher = useSelector(selectTeachers);
  return (
    <div className=" basis-3/4 overflow-hidden">
      {/* header */}

      <Header header={"Dashboard"} />
      {/* section */}
      <div className="  mx-5 my-5 grid grid-cols-4 gap-5 ">
        <div className=" bg-white rounded flex items-center gap-3 p-5">
          <img
            src={studentIcons}
            alt="studentICons"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-sm">Students</span>
            <p className=" font-bold text-xl">{student.length}</p>
          </div>
        </div>
        <div className=" bg-white rounded flex items-center gap-3 p-5">
          <div className="">
            <img
              src={TeacherIcon}
              alt="studentICons"
              className="w-10 h-10 rounded-full object-cover "
            />
          </div>

          <div>
            <span className="text-gray-400 text-sm">Teachers</span>
            <p className=" font-bold text-xl">{teacher.length}</p>
          </div>
        </div>
        <div className=" bg-white rounded flex items-center gap-3 p-5">
          <img
            src={parentIcon}
            alt="studentICons"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-sm">Parents</span>
            <p className=" font-bold text-xl">1254</p>
          </div>
        </div>
        <div className=" bg-white rounded flex items-center gap-3 p-5">
          <img
            src={EarnIcon}
            alt="studentICons"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-sm">Earnings</span>
            <p className=" font-bold text-xl">40.7K$</p>
          </div>
        </div>
      </div>

      <EventCalendar />
    </div>
  );
}
