/** library imports */
import React from "react";

/** custom imports */
import {
  HeAISuggesstions,
  HeAutoCompleteSearch,
  HeHeading2,
} from "../../../heCustomComponents";
import AddProcDone from "./addCards/AddProcDone";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const ProceduresDoneDuringVisit = ({ form, aiData }) => {
  const watchProcDone = form.watch("procDone");
  const { autoCompleteProcDone } = useSelector((state) => state.authReducer);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Procedures"} className={`md:text-[18px]`} />
      </div>
      <div className="w-full flex flex-col gap-2">
        {watchProcDone?.length > 0 && (
          <div className="flex flex-col gap-2">
            {watchProcDone?.map((item, index) => {
              return (
                <AddProcDone
                  key={index}
                  form={form}
                  fieldName={"procDone"}
                  index={index}
                  item={item}
                />
              );
            })}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <HeAutoCompleteSearch
            form={form}
            fieldName={"procDone"}
            searchType={"procedures_done"}
            dataArray={autoCompleteProcDone}
            attributes={{ reason: "" }}
          />
          <HeAISuggesstions
            form={form}
            fieldName={"procDone"}
            prevValue={watchProcDone}
            aiData={aiData}
            attributes={{ reason: "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProceduresDoneDuringVisit;
