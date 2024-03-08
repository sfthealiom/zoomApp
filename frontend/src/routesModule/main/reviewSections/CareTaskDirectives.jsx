/** library imports */
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

/** shadcn import */

/** redux imports */

const CareTaskDirectives = ({ form }) => {
  const [edit, setEdit] = useState(false);

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
            className="cursor-pointer h-5 w-5 text-slate-300"
            onClick={() => setEdit(true)}
          />
        ) : null}
      </div>
      <HeTextarea
        form={form}
        fieldName={`careTaskNotes`}
        placeholder={"Sometimes I feel..."}
        disabledStatus={!edit}
        innerTextClass={"border-slate-300 disbled:cursor-not-allowed"}
      />
    </div>
  );
};

export default CareTaskDirectives;
