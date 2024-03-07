/** library imports */
import React from "react";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

/** shadcn import */

/** redux imports */

const CareTaskDirectives = ({ form }) => {
  return (
    <div>
      <div className="w-full flex flex-col gap-2">
        <HeHeading2
          title={"Care Task and Directives"}
          className={`md:text-[18px]`}
        />
        <HeTextarea
          form={form}
          fieldName={"careTaskNotes"}
          placeholder={"Sometimes I feel..."}
          innerTextClass={"border-slate-200"}
        />
      </div>
    </div>
  );
};

export default CareTaskDirectives;
