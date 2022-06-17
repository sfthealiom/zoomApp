import React from "react";
import { Button } from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { companyMetaData } from "../assets/myCompanyData";

const HeNextStep = ({ disableMe, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <Button
      disabled={disableMe ? disableMe : false}
      type="submit"
      onClick={() => {
        if (navigateTo) {
          navigate(navigateTo);
        }
      }}
      className="flex gap-2 justify-center mx-auto items-center w-fit"
      style={
        disableMe
          ? {
              backgroundColor: companyMetaData.accentDisabled,
            }
          : {
              backgroundColor: companyMetaData.accentTwo,
            }
      }
    >
      <h1 className="font-bold">Next Step</h1>
      <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
    </Button>
  );
};

export default HeNextStep;
