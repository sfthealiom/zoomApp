/** library imports */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import {
  HeAISuggesstions,
  HeAutoCompleteSearch,
  HeHeading2,
  HeHeading3,
} from "../../../heCustomComponents";
import AddProcDone from "./addCards/AddProcDone";
import { AIProcessPill, Pill } from "../../../components/helpers";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const ProceduresDoneDuringVisit = ({ form, aiData }) => {
  const watchProcDone = form.watch("procDone");
  const { autoCompleteDataLabs } = useSelector((state) => state.authReducer);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Procedures Done During Visit"}
          className={`md:text-[18px]`}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        {watchProcDone?.length > 0 && (
          <div className="flex flex-col gap-2">
            {watchProcDone?.map((item, index) => {
              return (
                <AddProcDone
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
          <HeAutoCompleteSearch
            form={form}
            fieldName={"procDone"}
            searchType={"procedures"}
            dataArray={autoCompleteDataLabs}
          />
          <HeAISuggesstions
            form={form}
            fieldName={"procDone"}
            prevValue={watchProcDone}
            aiData={aiData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProceduresDoneDuringVisit;
