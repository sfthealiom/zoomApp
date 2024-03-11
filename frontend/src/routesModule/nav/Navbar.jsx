/** library imports */
import React from "react";
import { useNavigate } from "react-router-dom";

/** custom imports */
import { companyMetaData } from "../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

/** shadcn imports */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/Dropdown-Menu";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { isObjectEmpty } from "../../reduxFolder/CommonFunctions";
import { signOut } from "../../reduxFolder/actions/AuthActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { currentUserData } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white flex items-center justify-between select-none shadow-sm"
      style={{ backgroundColor: companyMetaData?.primary }}
    >
      {/* logo */}
      <div
        className="flex gap-2 items-center px-4 py-2 cursor-pointer"
        // onClick={() => navigate("/start-new-consultation")}
      >
        <h1 className="font-bold text-lg md:text-2xl text-white">
          {companyMetaData.companyName}
        </h1>
      </div>
      {!isObjectEmpty(currentUserData) && (
        <DropdownMenu>
          <DropdownMenuTrigger className="mx-4 my-2" asChild>
            <FontAwesomeIcon
              icon={faGear}
              className="text-slate-200 h-4 w-4 p-2 rounded-md cursor-pointer"
              style={{
                backgroundColor: companyMetaData?.secondary,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mx-2">
            <DropdownMenuLabel>
              {currentUserData?.first_name} {currentUserData?.last_name}
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <span>Profile</span>
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => dispatch(signOut(navigate, toast))}
            >
              <span>Logout</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
