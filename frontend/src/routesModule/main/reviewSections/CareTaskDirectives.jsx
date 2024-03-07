/** library imports */
import React from "react";
import { faCopy, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

/** shadcn import */

/** redux imports */

const CareTaskDirectives = ({ form }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Care Task and Directives"}
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
        <HeTextarea
          form={form}
          fieldName={`careTaskNotes`}
          placeholder={"Sometimes I feel..."}
          innerTextClass={"border-slate-200"}
        />
      </div>
    </div>
  );
};

export default CareTaskDirectives;
