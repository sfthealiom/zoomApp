import React from "react";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { HeHeading3 } from "../../../../heCustomComponents";

const ViewProc = ({ code, code_value, data }) => {
  return (
    <div
      className="w-full flex flex-col gap-2 px-4 py-2 rounded-md"
      style={{ backgroundColor: companyMetaData?.accentGray }}
    >
      <div className="flex items-center justify-between">
        <HeHeading3 title={code_value} />
        <p>{code}</p>
      </div>
      <div className="text-slate-400">
        <span className="font-semibold">Note: </span>
        {data}
      </div>
    </div>
  );
};

export default ViewProc;