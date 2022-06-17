import { companyMetaData } from "../assets/myCompanyData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const HeTick = () => {
  return (
    <div
      className="rounded-full h-20 w-20 border flex items-center justify-center"
      style={{
        borderColor: companyMetaData?.primary,
      }}
    >
      <FontAwesomeIcon
        icon={faCheck}
        style={{
          color: companyMetaData?.primary,
        }}
      />
    </div>
  );
};

export default HeTick;
