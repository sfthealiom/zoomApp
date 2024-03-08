/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";

const EditOrder = ({ form, fieldName, index, item }) => {
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
          const updatedArray = previousValues.slice(0, -1);
          form.setValue(fieldName, [...updatedArray]);
        }}
      />
      <div className="flex flex-col items-start gap-1 justify-between md:flex-row">
        <h1 className="max-w-xs font-semibold">{item?.code_value}</h1>
        <p>{item?.code}</p>
      </div>
      <HeRadioButtonTrueFalse
        form={form}
        fieldName={`orders[${index}].inClinic`}
        labelName={`In-clinic?`}
        value1={"Yes"}
        value2={"No"}
        className={`max-w-sm mt-2`}
      />
    </div>
  );
};

export default EditOrder;
