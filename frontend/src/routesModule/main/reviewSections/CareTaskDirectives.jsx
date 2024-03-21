/** library imports */
import React, { useState } from "react";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

/** shadcn import */

/** redux imports */

const CareTaskDirectives = ({ form }) => {
  const [edit, setEdit] = useState(false);
  const watchCareTaskNotes = form.watch("careTaskNotes");

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Care Task and Directives"}
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
        {watchCareTaskNotes?.length > 0 ? (
          <HeTextarea
            form={form}
            fieldName={`subjective`}
            disabledStatus={!edit}
            placeholder={"Sometimes I feel..."}
            innerTextClass={
              "border-slate-300 min-h-[120px] disbled:cursor-not-allowed"
            }
          />
        ) : edit ? (
          <HeTextarea
            form={form}
            fieldName={`careTaskNotes`}
            placeholder={"Sometimes I feel..."}
            disabledStatus={!edit}
            innerTextClass={"border-slate-300 min-h-[120px]"}
          />
        ) : (
          <span className="text-sm text-slate-500">
            No care task or directives added.
          </span>
        )}
      </div>
    </div>
  );
};

export default CareTaskDirectives;
