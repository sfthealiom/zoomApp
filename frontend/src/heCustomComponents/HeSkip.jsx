import React from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const HeSkip = ({ navigateTo }) => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => {
        navigate(navigateTo);
      }}
      className="bg-white text-black border-2 border-slate-300"
    >
      <h1>Skip</h1>
    </Button>
  );
};

export default HeSkip;
