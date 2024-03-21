/** library imports */
import React from "react";

/** custom imports */
import {
  HeSearchableSelect,
  HeTextInput,
} from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";
import {
  dispensedUnitData,
  route_static_data,
} from "../../../../reduxFolder/CommonFunctions";

const ViewMed = ({ form, fieldName, index, watchMeds }) => {
  console.log("watchMes", watchMeds);
  return (
    <div
      className="px-4 py-3 flex flex-col gap-2 rounded-md"
      style={{
        backgroundColor: companyMetaData?.accentGray,
      }}
    >
      <div className="flex items-start gap-1 justify-between">
        <h1 className="max-w-xs font-semibold">{watchMeds[index]?.display}</h1>
        <p>{watchMeds[index]?.code?.split(":")[1] || watchMeds[index]?.code}</p>
      </div>
      <div className="flex flex-col items-start gap-2 md:flex-row">
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].quantity_unit`}
          labelName={`Quantity`}
          placeholder={"1"}
          disabledStatus={true}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          value={watchMeds[index].quantity_unit}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].refills`}
          labelName={`Refills`}
          placeholder={"0"}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          disabledStatus={true}
          value={watchMeds[index].refills}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].days_supply`}
          labelName={`Days supply`}
          placeholder={"5"}
          disabledStatus={true}
          className={"flex flex-col rounded-md"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          value={watchMeds[index].days_supply}
        />
      </div>
      <div className="w-full flex items-start justify-between gap-2">
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].dispense_unit`}
          dataArray={dispensedUnitData}
          placeholder="Form"
          disabledStatus={true}
          labelName={`Form`}
          className={"w-full md:w-1/3"}
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          value={watchMeds[index].dispense_unit}
        />
        <HeSearchableSelect
          form={form}
          fieldName={`medications[${index}].route`}
          dataArray={route_static_data}
          placeholder="Route"
          disabledStatus={true}
          labelName={`Route`}
          className={"w-full md:w-1/3"}
          inputTextClass={"h-10 border-none"}
          commandClass={"w-[200px]"}
          value={watchMeds[index].route}
        />
        <HeTextInput
          form={form}
          fieldName={`medications[${index}].frequency`}
          labelName={`Directions`}
          placeholder={"Take..."}
          disabledStatus={true}
          className={"flex flex-col rounded-md w-full md:w-1/3"}
          innerTextClass={"border-none disabled:bg-transparent rounded-md"}
          value={watchMeds[index].frequency}
        />
      </div>
      <HeRadioButtonTrueFalse
        form={form}
        fieldName={`medications[${index}].substitutions_allowed`}
        labelName={`Allow Substitution`}
        className={"md:w-1/2"}
        value1={"Yes"}
        value2={"No"}
        disabledStatus={true}
        value={watchMeds[index].substitutions_allowed}
      />
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].reason`}
            labelName={`Order/Reason`}
            placeholder={"Notes..."}
            className={"flex flex-col rounded-md"}
            innerTextClass={"border-none disabled:bg-transparent rounded-md"}
            disabledStatus={true}
            value={watchMeds[index].reason}
          />
        </div>
        <div className="w-full md:w-1/2">
          <HeTextInput
            form={form}
            fieldName={`medications[${index}].pharmacy_notes`}
            labelName={`Pharmacy Notes`}
            placeholder={"Notes..."}
            className={"flex flex-col rounded-md"}
            innerTextClass={"border-none disabled:bg-transparent rounded-md"}
            disabledStatus={true}
            value={watchMeds[index].pharmacy_notes}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewMed;
