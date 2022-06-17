import React from "react";
import { Button } from "../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { companyMetaData } from "../assets/myCompanyData";

const HeForceSkip = ({ navigateTo }) => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      style={{ backgroundColor: companyMetaData.accentSlate }}
      className="flex gap-2 justify-center mx-auto items-center w-fit"
      onClick={() => {
        navigate(navigateTo);
      }}
    >
      <h1>Next (Demo)</h1>
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

export default HeForceSkip;
