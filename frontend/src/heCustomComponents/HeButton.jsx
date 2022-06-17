import React from "react";
import { Button } from "../components/ui/Button";
import { companyMetaData } from "../assets/myCompanyData.js";

const HeButton = ({
  title,
  titleColor,
  bgColor,
  disabledStatus,
  children,
  icon,
  className,
  onPress,
  titleClass,
  customStyle,
}) => {
  return (
    <Button
      type="button"
      disabled={disabledStatus}
      style={{
        color: titleColor || "white",
        backgroundColor: bgColor || companyMetaData?.secondary,
        customStyle,
      }}
      className={`flex items-center gap-2 ${className}`}
      onClick={onPress}
    >
      <h1
        className={`font-semibold ${titleClass}`}
        style={{
          backgroundColor: bgColor,
          color: titleColor,
        }}
      >
        {title || children}
      </h1>
      {icon && (
        <span
          className="flex items-center justify-center"
          style={{ backgroundColor: bgColor, color: titleColor }}
        >
          {icon}
        </span>
      )}
    </Button>
  );
};

export default HeButton;
