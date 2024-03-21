/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";

const Objective = ({ objectiveData }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Objective Summary / Physical Exam"}
          className={`md:text-[18px]`}
        />
        <div className="flex items-center gap-2 md:gap-4">
          <HeCopy targetText={objectiveData} targetId={"Objective"} />
        </div>
      </div>
      <div>
        {objectiveData?.length > 0 ? (
          <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3 border border-slate-300  rounded-md">
            {objectiveData}
          </p>
        ) : (
          <span className="text-sm text-slate-500">
            No Objective notes added.
          </span>
        )}
      </div>
    </div>
  );
};

export default Objective;
