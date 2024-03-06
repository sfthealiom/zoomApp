/** library imports */
import { Outlet } from "react-router-dom";
import { Navbar } from "../../routesModule/nav";

/** custom imports */

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen h-full bg-slate-100">
      <div className="w-full shadow-md sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="w-full flex-1 z-10 my-5">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
