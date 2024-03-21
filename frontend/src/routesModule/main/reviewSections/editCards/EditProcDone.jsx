/** library imports */
import React from "react";

/** custom imports */
import { HeTextInput } from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditProcDone = ({ form, fieldName, index, item, value }) => {
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
      <div className="flex items-start gap-1 justify-between">
        <h1 className="max-w-xs font-semibold">{item?.display}</h1>
        <p>{item?.code}</p>
      </div>
      <div className="w-full mt-2">
        <HeTextInput
          form={form}
          fieldName={`procDone[${index}].reason`}
          labelName={`Notes`}
          placeholder={"Notes..."}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          value={value}
        />
      </div>
    </div>
  );
};

export default EditProcDone;
