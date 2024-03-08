import React from "react";
import { companyMetaData } from "../../assets/myCompanyData";

const Pill = ({
  code,
  name,
  icon,
  pillColor,
  textColor,
  className,
  onPress,
  onIconClick,
}) => {
  return (
    <div
      className={`w-full h-fit rounded-md flex flex-col lg:flex-row gap-1 lg:gap-4 items-start justify-between px-4 py-2 text-sm cursor-pointer ${className}`}
      style={{
        backgroundColor: pillColor || companyMetaData?.accentOneLight,
      }}
      onClick={onPress}
    >
      <div className="w-full flex items-start justify-between">
        <h1
          title={name}
          className="font-semibold text-wrap"
          style={{
            color: textColor || "black",
          }}
        >
          {name}
        </h1>
        {icon && (
          <span
            className="md:hidden flex items-center justify-center cursor-pointer"
            onClick={onIconClick}
          >
            {icon}
          </span>
        )}
      </div>
      <div
        className="w-full md:w-fit flex items-center justify-between gap-1"
        style={{
          color: textColor || "black",
        }}
      >
        <h2>{code?.split(":")[1] || code}</h2>
        {icon && (
          <span
            className="hidden md:flex items-center justify-center cursor-pointer ml-1"
            onClick={onIconClick}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Pill;
