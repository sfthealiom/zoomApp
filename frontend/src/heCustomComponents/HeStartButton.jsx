import React from "react";

import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const HeStartButton = ({
  title,
  bgColor,
  fontColor,
  navigateTo,
  icon,
  customClass,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      className={`h-[150px] w-[250px] md:h-[200px] md:w-[300px] flex flex-col items-center gap-2 rounded-2xl ${customClass}`}
      style={{ backgroundColor: bgColor }}
      onClick={() => (navigateTo ? navigate(navigateTo) : null)}
    >
      <span style={{ backgroundColor: bgColor, color: fontColor }}>{icon}</span>
      <h1
        style={{
          backgroundColor: bgColor,
          color: fontColor,
        }}
      >
        {title}
      </h1>
    </Button>
  );
};

export default HeStartButton;
