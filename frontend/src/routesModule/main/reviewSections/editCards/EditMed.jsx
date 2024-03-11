/** library imports */
import React from "react";

/** custom imports */
import {
  HeSearchableSelect,
  HeTextInput,
} from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";
import {
  dispensedUnitData,
  route_static_data,
} from "../../../../reduxFolder/CommonFunctions";

const EditMed = ({ form, fieldName, index, watchMeds }) => {
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
        <h1 className="max-w-xs font-semibold">{watchMeds[index]?.display}</h1>
        <p>{watchMeds[index]?.code?.split(":")[1] || watchMeds[index]?.code}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].quantity_unit`}
          labelName={`Quantity`}
          placeholder={"1"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].refills`}
          labelName={`Refills`}
          placeholder={"0"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].days_supply`}
          labelName={`Days supply`}
          placeholder={"5"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
        />
      </div>
      <div className="w-full flex items-start justify-between gap-2">
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].dispense_unit`}
          dataArray={dispensedUnitData}
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
          dataArray={route_static_data}
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
        fieldName={`medications[${index}].frequency`}
        labelName={`Directions`}
        placeholder={"Take..."}
        className={"flex flex-col gap-2 rounded-md"}
        innerTextClass={"border-none px-2 rounded-md"}
      />
      <HeRadioButtonTrueFalse
        form={form}
        fieldName={`medications[${index}].substitutions_allowed`}
        labelName={`Allow Substitution`}
        className={"md:w-1/2"}
        value1={"Yes"}
        value2={"No"}
      />
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].reason`}
            labelName={`Order/Reason`}
            placeholder={"Notes..."}
            className={"flex flex-col gap-2 rounded-md"}
            innerTextClass={"border-none px-2 rounded-md"}
          />
        </div>
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].pharmacy_notes`}
            labelName={`Pharmacy Notes`}
            placeholder={"Notes..."}
            className={"flex flex-col gap-2 rounded-md"}
            innerTextClass={"border-none px-2 rounded-md"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditMed;
