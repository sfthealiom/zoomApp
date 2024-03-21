/** library imports */
import React from "react";

/** custom imports */
import {
  HeAISuggesstions,
  HeAutoCompleteSearch,
  HeHeading2,
} from "../../../heCustomComponents";
import AddMed from "./addCards/AddMed";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const Medications = ({ form, aiData }) => {
  const { autoCompleteDataMed } = useSelector((state) => state.authReducer);

  const watchMeds = form.watch("medications");
  const attributes = {
    quantity_unit: "",
    refills: "",
    days_supply: "",
    dispense_unit: "",
    route: "",
    frequency: "",
    substitutions_allowed: false,
    reason: "",
    pharmacy_notes: "",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Medication Orders"} className={`md:text-[18px]`} />
      </div>
      <div className="w-full flex flex-col gap-2">
        {watchMeds?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {watchMeds?.map((item, index) => {
              return (
                <AddMed
                  key={index}
                  form={form}
                  fieldName={"medications"}
                  index={index}
                  watchMeds={watchMeds}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No medications added.</p>
        )}
        <div className="flex flex-col gap-2">
          <HeAutoCompleteSearch
            form={form}
            fieldName={"medications"}
            searchType={"medications"}
            dataArray={autoCompleteDataMed}
            attributes={attributes}
          />
          <HeAISuggesstions
            form={form}
            fieldName={"medications"}
            prevValue={watchMeds}
            aiData={aiData}
            attributes={attributes}
          />
        </div>
      </div>
    </div>
  );
};

export default Medications;
