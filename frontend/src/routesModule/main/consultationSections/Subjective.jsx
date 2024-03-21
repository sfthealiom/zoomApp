/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import { HeHeading2 } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Subjective = ({ aiData }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <HeHeading2 title={"Subjective Summary"} className={`md:text-[18px]`} />
      <div
        className="rounded-md"
        style={{
          backgroundColor: companyMetaData?.aiLight,
          color: companyMetaData?.aiDark,
        }}
      >
        {aiData?.length > 0 ? (
          <p
            className="h-[120px] overflow-y-scroll text-slate-600 scrollbar px-4 py-3 text-left"
            style={{
              color: companyMetaData?.aiDark,
            }}
          >
            {aiData?.join(" ")}
          </p>
        ) : (
          <div className="flex items-center px-4 py-2 font-semibold">
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

export default Subjective;
