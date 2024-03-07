/** library imports */
import React, { useState } from "react";

/** custom imports */
import { HeTextInput } from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const AddProcDone = ({ form, fieldName, index, item }) => {
  const [showOrdRea, setShowOrdRea] = useState(false);

  return (
    <div
      className="px-4 py-3 flex flex-col gap-1 rounded-md"
      style={{
        backgroundColor: companyMetaData?.accentOneLight,
      }}
    >
      <FontAwesomeIcon
        icon={faXmark}
        className="h-4 w-4 self-end cursor-pointer"
        onClick={() => {
          const previousValues = form.watch(fieldName);
          const updatedArray = previousValues?.filter((item, idx) => {
            return idx !== index;
          });
          form.setValue(fieldName, [...updatedArray]);
        }}
      />
      <div className="flex items-start gap-1 justify-between">
        <h1 className="max-w-xs font-semibold">{item?.code_value}</h1>
        <p>{item?.code}</p>
      </div>
      <div className="w-full mt-2">
        {showOrdRea ? (
          <HeTextInput
            form={form}
            fieldName={`procDone[${index}].orderReason`}
            labelName={`Notes`}
            placeholder={"Notes..."}
            className={"flex flex-col gap-2 rounded-md"}
            innerTextClass={"border-none px-2 rounded-md"}
          />
        ) : (
          <div
            className="flex items-center gap-1 cursor-pointer text-slate-500 font-semibold text-sm"
            onClick={() => setShowOrdRea(true)}
          >
            <span>Order/Reason</span>
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProcDone;
