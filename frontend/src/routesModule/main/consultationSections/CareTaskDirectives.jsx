/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import { HeHeading2 } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const CareTaskDirectives = ({ aiData }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <HeHeading2
        title={"Care Task and Directives"}
        className={`md:text-[18px]`}
      />
      <div className="rounded-md">
        {aiData?.length > 0 ? (
          <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3 border border-slate-300 rounded-md">
            {aiData}
          </p>
        ) : (
          <div
            className="flex items-center px-4 py-2 font-semibold"
            style={{
              backgroundColor: companyMetaData?.aiLight,
              color: companyMetaData?.aiDark,
            }}
          >
            <span>Preparing Summary</span>
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="h-4 w-4 ml-2 animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CareTaskDirectives;

// /** library imports */
// import React from "react";

// /** custom imports */
// import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

// /** shadcn import */

// /** redux imports */

// const CareTaskDirectives = ({ form }) => {
//   return (
//     <div>
//       <div className="w-full flex flex-col gap-2">
//         <HeHeading2
//           title={"Care Task and Directives"}
//           className={`md:text-[18px]`}
//         />
//         <HeTextarea
//           form={form}
//           fieldName={"careTaskNotes"}
//           placeholder={"Sometimes I feel..."}
//           innerTextClass={"border-slate-200"}
//         />
//       </div>
//     </div>
//   );
// };

// export default CareTaskDirectives;
