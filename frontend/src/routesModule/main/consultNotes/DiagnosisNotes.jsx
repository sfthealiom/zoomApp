/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";
import { Pill } from "../../../components/helpers";
import { companyMetaData } from "../../../assets/myCompanyData";

/** shadcn imports */

/** redux imports */

const Diagnosis = ({ diffDiag, workDiag }) => {
  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      {/* differential diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Differential Diagnoses (DDx)"}
            className={`md:text-[18px]`}
          />
          <HeCopy
            targetText={JSON.stringify(JSON.stringify(diffDiag))}
            targetId={"diffDiag"}
          />
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
          {diffDiag?.length > 0 ? (
            diffDiag?.map((item, index) => {
              return (
                <Pill
                  key={index}
                  code={item?.code}
                  name={item?.display || item?.code_value}
                  pillColor={companyMetaData?.accentGray}
                />
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              No differential diagnoses added.
            </p>
          )}
        </div>
      </div>

      {/* working diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Working Diagnoses"}
            className={`md:text-[18px]`}
          />
          <HeCopy
            targetText={JSON.stringify(JSON.stringify(workDiag))}
            targetId={"workDiag"}
          />
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
          {workDiag?.length > 0 ? (
            workDiag?.map((item, index) => {
              return (
                <Pill
                  key={index}
                  code={item?.code}
                  name={item?.display || item?.code_value}
                  pillColor={companyMetaData?.accentGray}
                />
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              No working diagnoses added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
