/** library imports */
import React, { useEffect, useState } from "react";
import { faCopy, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeHeading2 } from "../../../heCustomComponents";
import EditProcDone from "./editCards/EditProcDone";

/** shadcn import */
import { Input } from "../../../components/ui/Input";

/** redux imports */

const ProceduresDone = ({ form }) => {
  const [search, setSearch] = useState("");
  const watchProcDone = form.watch("procDone");

  useEffect(() => {
    // dispatch(autoCompleteSearch("labs", search));
  }, [search]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Procedures Done During Visit"}
          className={`md:text-[18px]`}
        />
        <div className="flex items-center gap-2 md:gap-4">
          <FontAwesomeIcon
            icon={faCopy}
            className="cursor-pointer h-5 w-5 text-slate-300"
          />
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer h-5 w-5 text-slate-300"
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {watchProcDone?.length > 0 && (
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
        )}
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Start typing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-md px-4 py-3 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default ProceduresDone;
