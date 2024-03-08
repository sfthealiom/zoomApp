/** library imports */
import React from "react";

/** custom imports */
import {
  HeSearchableSelect,
  HeTextInput,
} from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";

const ViewMed = ({ form, fieldName, index, watchMeds }) => {
  const form_ways = [
    {
      id: "Oral",
      item: "Oral",
    },
  ];

  return (
    <div
      className="px-4 py-3 flex flex-col gap-2 rounded-md"
      style={{
        backgroundColor: companyMetaData?.accentGray,
      }}
    >
      <div className="flex items-start gap-1 justify-between">
        <h1 className="max-w-xs font-semibold">
          {watchMeds[index]?.code_value}
        </h1>
        <p>{watchMeds[index]?.code}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].quantity`}
          labelName={`Quantity`}
          placeholder={"1"}
          disabledStatus={true}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].refills`}
          labelName={`Refills`}
          placeholder={"0"}
          disabledStatus={true}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].daySupply`}
          labelName={`Days supply`}
          placeholder={"5"}
          disabledStatus={true}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          required={true}
        />
      </div>
      <div className="w-full flex items-start justify-between gap-2">
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].form_way`}
          dataArray={form_ways}
          placeholder="Form"
          disabledStatus={true}
          labelName={`Form`}
          className={"w-full md:w-1/3"}
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          required={true}
        />
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].route`}
          dataArray={form_ways}
          placeholder="Route"
          disabledStatus={true}
          labelName={`Route`}
          className={"w-full md:w-1/3"}
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].directions`}
          labelName={`Directions`}
          placeholder={"Take..."}
          disabledStatus={true}
          className={"flex flex-col rounded-md w-full md:w-1/3"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          required={true}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-2">
        <HeRadioButtonTrueFalse
          form={form}
          fieldName={`medications[${index}].allowSub`}
          labelName={`Allow Substitution`}
          value1={"Yes"}
          disabledStatus={true}
          value2={"No"}
        />
        <HeRadioButtonTrueFalse
          form={form}
          fieldName={`medications[${index}].inClinic`}
          labelName={`In-clinic`}
          value1={"Yes"}
          disabledStatus={true}
          value2={"No"}
        />
      </div>
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].orderReason`}
            labelName={`Order/Reason`}
            placeholder={"Notes..."}
            className={"flex flex-col rounded-md"}
            innerTextClass={"border-none disabled:bg-transparent rounded-md"}
            disabledStatus={true}
          />
        </div>
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].pharmacyNotes`}
            labelName={`Pharmacy Notes`}
            placeholder={"Notes..."}
            className={"flex flex-col rounded-md"}
            innerTextClass={"border-none disabled:bg-transparent rounded-md"}
            disabledStatus={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewMed;