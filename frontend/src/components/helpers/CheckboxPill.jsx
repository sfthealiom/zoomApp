import React from "react";
import { companyMetaData } from "../../assets/myCompanyData";
import { Checkbox } from "../../components/ui/Checkbox";

const CheckboxPill = ({ code, name, icon, pillColor, textColor }) => {
  return (
    <div
      className="w-full h-fit rounded-md flex flex-col lg:flex-row gap-1  lg:gap-4 items-start justify-between px-4 py-2 text-sm"
      style={{
        backgroundColor: pillColor || companyMetaData?.accentOneLight,
      }}
    >
      <div className="flex items-center gap-2 truncate">
        <Checkbox className="bg-white border border-slate-500 rounded-sm" />
        <h1
          title={name}
          className="font-semibold"
          style={{
            color: textColor || "black",
          }}
        >
          {name}
        </h1>
      </div>
      <div
        className="w-full md:w-fit flex items-center justify-between gap-1"
        style={{
          color: textColor || "black",
        }}
      >
        <h2>{code}</h2>
        {icon && (
          <span className="flex items-center justify-center cursor-pointer ml-1">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default CheckboxPill;
