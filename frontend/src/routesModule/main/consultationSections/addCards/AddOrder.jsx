/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";

const AddOrder = ({ form, fieldName, index, item, value }) => {
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
        <h1 className="font-semibold">{item?.display}</h1>
        <p>{item?.code}</p>
      </div>
      <HeRadioButtonTrueFalse
        form={form}
        fieldName={`${fieldName}[${index}].order_fulfilment`}
        labelName={`In-clinic?`}
        value1={"Yes"}
        value2={"No"}
        className={`max-w-sm mt-2`}
        value={value}
      />
    </div>
  );
};

export default AddOrder;
