/** library imports */
import React, { useState } from "react";

/** custom imports */
import {
  HeButton,
  HeSearchableSelect,
  HeTextInput,
} from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";

const EditMed = ({ form, fieldName, index, watchMeds }) => {
  const form_ways = [
    {
      id: "Oral",
      item: "Oral",
    },
  ];

  const [showOrdRea, setShowOrdRea] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div
      className="px-4 py-3 flex flex-col gap-2 rounded-md"
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
        <h1 className="max-w-xs font-semibold">{watchMeds[index]?.value}</h1>
        <p>{watchMeds[index]?.code}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].quantity`}
          labelName={`Quantity`}
          placeholder={"1"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].refills`}
          labelName={`Refills`}
          placeholder={"0"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].daySupply`}
          labelName={`Days supply`}
          placeholder={"5"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
        />
      </div>
      <div className="w-full flex items-start justify-between gap-2">
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].form_way`}
          dataArray={form_ways}
          placeholder="Form"
          labelName={`Form`}
          className={"w-full md:w-1/2 gap-2"}
          buttonClasses={
            "w-full h-10 px-2 rounded-md font-semibold select-none bg-white"
          }
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          required={true}
        />
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].route`}
          dataArray={form_ways}
          placeholder="Route"
          labelName={`Route`}
          className={"w-full md:w-1/2 gap-2"}
          buttonClasses={
            "w-full h-10 px-2 rounded-md font-semibold select-none bg-white"
          }
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          required={true}
        />
      </div>
      <HeTextInput
        form={form}
        fieldName={`medications[${index}].directions`}
        labelName={`Directions`}
        placeholder={"Take..."}
        className={"flex flex-col gap-2 rounded-md"}
        innerTextClass={"border-none px-2 rounded-md"}
        required={true}
      />
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-2">
        <HeRadioButtonTrueFalse
          form={form}
          fieldName={`medications[${index}].allowSub`}
          labelName={`Allow Substitution`}
          value1={"Yes"}
          value2={"No"}
        />
        <HeRadioButtonTrueFalse
          form={form}
          fieldName={`medications[${index}].inClinic`}
          labelName={`In-clinic`}
          value1={"Yes"}
          value2={"No"}
        />
      </div>
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full md:w-1/2">
          {showOrdRea ? (
            <HeTextInput
              form={form}
              fieldName={`medications[${index}].orderReason`}
              labelName={`Order/Reason`}
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
        <div className="w-full md:w-1/2">
          {showNotes ? (
            <HeTextInput
              form={form}
              fieldName={`medications[${index}].pharmacyNotes`}
              labelName={`Pharmacy Notes`}
              placeholder={"Notes..."}
              className={"flex flex-col gap-2 rounded-md"}
              innerTextClass={"border-none px-2 rounded-md"}
            />
          ) : (
            <div
              className="flex items-center gap-1 cursor-pointer text-slate-500 font-semibold text-sm"
              onClick={() => setShowNotes(true)}
            >
              <span>Pharmacy Notes</span>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMed;
