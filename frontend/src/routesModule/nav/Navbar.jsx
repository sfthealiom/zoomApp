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
import axios from "axios";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { isObjectEmpty } from "../../reduxFolder/CommonFunctions";
import {
  setInitialValues,
  signOut,
} from "../../reduxFolder/actions/AuthActions";
import companyLogo from "../../assets/images/companyLogo.png";
const Navbar = () => {
  const dispatch = useDispatch();
  const { currentUserData, meetingId } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  return (
    <div
      className="bg-white flex items-center justify-between select-none shadow-sm"
      style={{ backgroundColor: companyMetaData?.bgColor }}
    >
      {/* logo */}
      <div
        className="flex gap-2 items-center px-4 py-2 cursor-pointer"
        onClick={() =>
          !isObjectEmpty(currentUserData) && navigate("/start-new-consultation")
        }
      >
        <img
          src={companyLogo}
          alt="company.png"
          className="w-[30px] rounded-md p-1"
        />
        <h1 className="font-bold text-lg md:text-2xl text-black">
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
                backgroundColor: companyMetaData?.accentGray,
                color: "black",
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
              onClick={() => {
                dispatch(signOut(navigate, toast));
                dispatch(setInitialValues());
                try {
                  axios.post("/api/zoomapp/stoplivestream", {
                    meetingId: meetingId,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
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
