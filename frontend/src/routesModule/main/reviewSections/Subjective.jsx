/** library imports */
import React, { useState } from "react";

/** custom imports */
import { HeCopy, HeHeading2, HeTextarea } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Subjective = ({ form }) => {
  const watchSubjective = form.watch("subjective");

  const [edit, setEdit] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Subjective Summary"} className={`md:text-[18px]`} />
        <div className="flex items-center gap-2 md:gap-4">
          <HeCopy targetId={"subjective"} targetText={watchSubjective} />
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer h-5 w-5 text-slate-300"
            onClick={() => setEdit(true)}
          />
        </div>
      </div>
      <div className="rounded-md">
        {watchSubjective?.length > 0 ? (
          <HeTextarea
            form={form}
            fieldName={`subjective`}
            disabledStatus={!edit}
            placeholder={"Sometimes I feel..."}
            innerTextClass={
              "border-slate-300 min-h-[200px] disbled:cursor-not-allowed"
            }
          />
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
