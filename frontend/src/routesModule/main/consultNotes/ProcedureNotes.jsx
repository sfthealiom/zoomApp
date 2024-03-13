/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";
import ViewProc from "../reviewSections/viewCards/ViewProc";

/** shadcn import */

/** redux imports */

const ProcedureNotes = ({ procedureNotes }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Procedures"} className={`md:text-[18px]`} />
        <HeCopy
          targetText={JSON.stringify(JSON.stringify(procedureNotes))}
          targetId={"orders"}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          {procedureNotes?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {procedureNotes?.map((item, index) => {
                return (
                  <ViewProc
                    key={index}
                    code={item?.code}
                    code_value={item?.display || item?.code_value}
                    data={item?.reason}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No procedures added.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcedureNotes;
