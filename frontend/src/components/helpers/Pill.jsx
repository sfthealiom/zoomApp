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
  reason,
}) => {
  return (
    <div
      className={`w-full h-fit rounded-md flex gap-1 lg:gap-4 items-start justify-between px-4 py-2 text-sm cursor-pointer ${className}`}
      style={{
        backgroundColor: pillColor || companyMetaData?.accentOneLight,
      }}
      onClick={onPress}
    >
      <div className="w-full flex flex-col items-start justify-between">
        <h1
          title={name}
          className="font-semibold text-wrap"
          style={{
            color: textColor || "black",
          }}
        >
          {name}
        </h1>
        <h2
          style={{
            color: textColor || "black",
          }}
        >
          {code?.split(":")[1] || code}
        </h2>
        <h2
          style={{
            color: textColor || "black",
          }}
        >
          {reason ?? ""}
        </h2>
      </div>
      {/* <div
        className="w-full md:w-fit flex items-center justify-between gap-1"
        style={{
          color: textColor || "black",
        }}
      >
      </div> */}
      {icon && (
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={onIconClick}
          color={textColor || "black"}
        >
          {icon}
        </span>
      )}
    </div>
  );
};

export default Pill;
