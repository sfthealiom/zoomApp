/** library imports */
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeAutoCompleteSearch, HeHeading2 } from "../../../heCustomComponents";
import EditProcDone from "./editCards/EditProcDone";
import ViewProc from "./viewCards/ViewProc";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const ProceduresDone = ({ form }) => {
  const watchProcDone = form.watch("procDone");
  const { autoCompleteProcDone } = useSelector((state) => state.authReducer);

  const [edit, setEdit] = useState(false);
  const attributes = {
    reason: "",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Procedures"} className={`md:text-[18px]`} />
        {!edit ? (
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer h-5 w-5 text-slate-300"
            onClick={() => setEdit(true)}
          />
        ) : null}
      </div>
      <div className="w-full flex flex-col gap-2">
        {edit ? (
          watchProcDone?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {watchProcDone?.map((item, index) => {
                return (
                  <EditProcDone
                    key={index}
                    form={form}
                    fieldName={"procDone"}
                    index={index}
                    item={item}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No procedures added.</p>
          )
        ) : watchProcDone?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {watchProcDone?.map((item, index) => {
              return (
                <ViewProc
                  key={index}
                  code={item?.code}
                  code_value={item?.display}
                  data={item?.reason}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No procedures added.</p>
        )}
        {edit && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"procDone"}
            searchType={"procedures_done"}
            attributes={attributes}
            dataArray={autoCompleteProcDone}
          />
        )}
      </div>
    </div>
  );
};

export default ProceduresDone;
