import React from "react";
import { companyMetaData } from "../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const AIProcessPill = ({}) => {
  return (
    <div
      className="w-full h-fit rounded-md flex flex-col lg:flex-row gap-1  lg:gap-4 items-start justify-between px-4 py-2 text-sm"
      style={{
        backgroundColor: "white",
      }}
    >
      <h1
        className="font-semibold"
        style={{
          color: companyMetaData?.aiDark,
        }}
      >
        <span>Processing transcript</span>{" "}
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="h-4 w-4 ml-2 animate-spin"
        />
      </h1>
    </div>
  );
};

export default AIProcessPill;
