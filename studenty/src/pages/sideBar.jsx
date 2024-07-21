import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function Sidebar() {
  const activeClassName = "text-gray-700 font-bold bg-white";
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <div className=" bg-gray-800 text-white flex flex-col basis-1/4 ">
      <div className="flex items-center justify-center h-20 p-2 bg-gray-900">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <nav className="text-left ">
        <ul>
          <li>
            <NavLink
              to="/"
              exact
              className={({ isActive }) =>
                `block py-4 px-4 hover:text-white hover:bg-gray-700 text-xl ${
                  isActive ? activeClassName : ""
                }`
              }
            >
              <HomeIcon
                fontSize="large"
                sx={{ marginBottom: 1, marginRight: 1 }}
              />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Subjects"
              className={({ isActive }) =>
                `block py-4 px-4 hover:text-white hover:bg-gray-700 text-xl ${
                  isActive ? activeClassName : ""
                }`
              }
            >
              <ClassIcon
                fontSize="large"
                sx={{ marginBottom: 1, marginRight: 1 }}
              />
              Subjects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `block py-4 px-4 hover:text-white hover:bg-gray-700 text-xl ${
                  isActive ? activeClassName : ""
                }`
              }
            >
              <SchoolIcon
                fontSize="large"
                sx={{ marginBottom: 1, marginRight: 1 }}
              />
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                `block py-4 px-4 hover:text-white hover:bg-gray-700 text-xl ${
                  isActive ? activeClassName : ""
                }`
              }
            >
              <LiaChalkboardTeacherSolid
                style={{
                  marginBottom: 1,
                  marginRight: 1,
                  fontSize: "2.5rem",
                  display: "inline-block",
                }}
              />
              Teachers
            </NavLink>
          </li>
          <NavLink
            to="/classes"
            className={({ isActive }) =>
              `block py-4 px-4 hover:text-white hover:bg-gray-700 text-xl ${
                isActive ? activeClassName : ""
              }`
            }
          >
            <MenuBookIcon
              fontSize="large"
              sx={{ marginBottom: 1, marginRight: 1 }}
            />
            Classes
          </NavLink>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
