import React from "react";
import { companyMetaData } from "../../assets/myCompanyData";

const Pill = ({ code, name }) => {
  return (
    <div
      className="w-full h-fit rounded-md flex gap-4 items-start justify-between px-4 py-2 text-sm"
      style={{
        backgroundColor: companyMetaData?.primaryLightest,
      }}
    >
      <h1 className="text-slate-700 font-semibold" title={name}>
        {name}
      </h1>
      <h2 className="text-slate-500">{code?.split(":")[1] || code}</h2>
    </div>
  );
};

export default Pill;
