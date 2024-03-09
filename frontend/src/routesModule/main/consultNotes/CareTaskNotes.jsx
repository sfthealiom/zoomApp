/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";

const CareTaskNotes = ({ careNotes }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Care Task and Directives"}
          className={`md:text-[18px]`}
        />
        {/* <HeCopy
          targetText={JSON.stringify(JSON.stringify(careNotes))}
          targetId={"careTask"}
        /> */}
      </div>
      <div className="rounded-md">
        {careNotes?.length > 0 ? (
          <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3 border border-slate-300 rounded-md">
            {careNotes}
          </p>
        ) : (
          <p className="text-sm text-slate-500">
            No care task and directives added.
          </p>
        )}
      </div>
    </div>
  );
};

export default CareTaskNotes;
