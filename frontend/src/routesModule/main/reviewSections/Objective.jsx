/** library imports */
import React, { useState } from "react";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Objective = ({ form }) => {
  const watchObjective = form.watch("objective");

  const [edit, setEdit] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Objective Summary / Physical Exam"}
          className={`md:text-[18px]`}
        />
        {!edit ? (
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer h-5 w-5 text-gray-500"
            onClick={() => setEdit(true)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCheck}
            className="cursor-pointer h-5 w-5 text-gray-500"
            onClick={() => setEdit(false)}
          />
        )}
      </div>
      <div className="rounded-md">
        {watchObjective?.length > 0 ? (
          <HeTextarea
            form={form}
            disabledStatus={!edit}
            fieldName={`objective`}
            placeholder={"Sometimes I feel..."}
            innerTextClass={
              "border-slate-300 min-h-[120px] disbled:cursor-not-allowed"
            }
          />
        ) : edit ? (
          <HeTextarea
            form={form}
            fieldName={`objective`}
            placeholder={"Sometimes I feel..."}
            innerTextClass={"border-slate-300 min-h-[120px]"}
          />
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
