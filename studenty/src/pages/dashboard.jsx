import Sidebar from "./sideBar";

import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex bg-gray-700">
      <Sidebar />
      {/* main */}

      <Outlet />
    </div>
  );
}

export default Dashboard;
