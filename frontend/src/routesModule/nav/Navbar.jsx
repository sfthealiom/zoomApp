/** library imports */
import React from "react";
import { useNavigate } from "react-router-dom";

/** custom imports */
import { companyMetaData } from "../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

/** redux imports */

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white flex items-center justify-between select-none shadow-sm"
      style={{ backgroundColor: companyMetaData?.primary }}
    >
      {/* logo */}
      <div
        className="flex gap-2 items-center px-4 py-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* <img
          src={companyMetaData.companyLogoUrl}
          alt="company_logo.png"
          className="w-[25px] md:w-[50px]"
        /> */}
        <h1 className="font-bold text-lg md:text-2xl text-white">
          {companyMetaData.companyName}
        </h1>
      </div>
      <button className="px-4 py-2">
        <FontAwesomeIcon
          icon={faGear}
          className="text-slate-200 h-4 w-4 p-2 rounded-md cursor-pointer"
          style={{
            backgroundColor: companyMetaData?.secondary,
          }}
        />
      </button>
    </div>
  );
};

export default Navbar;
