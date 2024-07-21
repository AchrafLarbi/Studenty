import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import profile from "../../assets/icon1.JPG";

// eslint-disable-next-line react/prop-types
export default function Header({ header }) {
  return (
    <div className=" m-5 flex justify-evenly items-center p-6 h-20 bg-white rounded ">
      <h1 className="text-3xl leading-8 font-bold">{header}</h1>
      <input
        type="text"
        placeholder="Search for Students/Courses/Home.."
        className="w-2/4 p-2 border border-gray-300 rounded h-10"
      />
      <NotificationsNoneIcon fontSize="large" />
      <div className="flex items-center space-x-2">
        <img src={profile} alt="Profilee" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
}
