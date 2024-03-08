/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";

const Subjective = ({ subjectiveData }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Subjective Summary"} className={`md:text-[18px]`} />
        <HeCopy targetText={subjectiveData} targetId={"subjective"} />
      </div>
      <div>
        {subjectiveData?.length > 0 ? (
          <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3 border border-slate-300 rounded-md">
            {subjectiveData}
          </p>
        ) : (
          <span className="text-sm text-slate-400">
            No Subjective notes added
          </span>
        )}
      </div>
    </div>
  );
};

export default Subjective;
