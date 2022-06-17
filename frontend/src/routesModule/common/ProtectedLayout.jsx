/** library imports */
import { Outlet } from "react-router-dom";
import { Navbar } from "../../routesModule/nav";

/** custom imports */

const ProtectedLayout = () => {
  return (
    <div>
      {/* <div className="w-full md:w-7/12 h-full min-h-screen sticky top-0 flex flex-col items-center justify-center border">
        <div>Zoom Screen</div>
      </div> */}
      <div className="">
        <div className="w-full sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="w-full flex-1 z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
