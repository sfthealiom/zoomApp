import React from "react";
import { Button } from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { companyMetaData } from "../assets/myCompanyData";

const HeSkip = ({ onPress }) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onPress}
      className="flex gap-2 justify-center items-center w-fit bg-white text-black border-2 border-slate-300"
    >
      <h1>Clear</h1>
      <FontAwesomeIcon
        icon={faXmark}
        className="h-4 w-4"
        style={{
          color: companyMetaData.accentTwo,
        }}
      />
    </Button>
  );
};

export default HeSkip;
