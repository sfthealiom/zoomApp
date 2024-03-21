/** library imports */
import React, { useState } from "react";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeAutoCompleteSearch, HeHeading2 } from "../../../heCustomComponents";
import EditMed from "./editCards/EditMed";

/** redux imports */
import { useSelector } from "react-redux";
import ViewMed from "./viewCards/ViewMed";

const Medications = ({ form }) => {
  const [edit, setEdit] = useState(false);

  const watchMeds = form.watch("medications");
  const { autoCompleteDataMed } = useSelector((state) => state.authReducer);
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
      <div className="w-full flex flex-col gap-2">
        {watchMeds?.length > 0 ? (
          <div>
            {edit ? (
              <div className="flex flex-col gap-2">
                {watchMeds?.map((item, index) => {
                  return (
                    <EditMed
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
              <div className="flex flex-col gap-2">
                {watchMeds?.map((item, index) => {
                  return (
                    <ViewMed
                      key={index}
                      form={form}
                      fieldName={"medications"}
                      index={index}
                      watchMeds={watchMeds}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No medications added.</p>
        )}
        {edit && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"medications"}
            searchType={"medications"}
            dataArray={autoCompleteDataMed}
            attributes={attributes}
          />
        )}
      </div>
    </div>
  );
};

export default Medications;
