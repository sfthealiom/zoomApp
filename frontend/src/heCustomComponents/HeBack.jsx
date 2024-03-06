import React from "react";
import { Button } from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { companyMetaData } from "../assets/myCompanyData";

const HeBack = ({ navigateTo }) => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="outline"
      className="flex gap-2 justify-center items-center w-fit bg-white"
      onClick={() => {
        navigate(navigateTo);
      }}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="h-4 w-4"
        style={{
          color: companyMetaData.accentTwo,
        }}
      />
      <h1 className="font-bold text-slate-500">Back</h1>
    </Button>
  );
};

export default HeBack;
