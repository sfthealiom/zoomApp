/** library imports */
import React, { useState } from "react";

/** custom imports */
import {
  HeSearchableSelect,
  HeTextInput,
} from "../../../../heCustomComponents";
import { companyMetaData } from "../../../../assets/myCompanyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import HeRadioButtonTrueFalse from "../../../../heCustomComponents/HeRadioButtonTrueFalse";
import {
  dispensedUnitData,
  route_static_data,
} from "../../../../reduxFolder/CommonFunctions";

const AddMed = ({ form, fieldName, index, watchMeds }) => {
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
          const updatedArray = previousValues?.filter((item, idx) => {
            return idx !== index;
          });
          form.setValue(fieldName, [...updatedArray]);
        }}
      />
      <div className="flex flex-col items-start gap-1 justify-between md:flex-row">
        <h1 className="max-w-xs font-semibold">{watchMeds[index]?.display}</h1>
        <p>{watchMeds[index]?.code?.split(":")[1] || watchMeds[index]?.code}</p>
      </div>
      <div className="flex flex-col items-start gap-2 sm:flex-row">
        <HeTextInput
          form={form}
          fieldName={`${fieldName}[${index}].quantity_unit`}
          labelName={`Quantity`}
          placeholder={"1"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
          value={watchMeds[index].quantity_unit}
        />
        <HeTextInput
          form={form}
          fieldName={`${fieldName}[${index}].refills`}
          labelName={`Refills`}
          placeholder={"0"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          value={watchMeds[index].refills}
        />
        <HeTextInput
          form={form}
          fieldName={`${fieldName}[${index}].days_supply`}
          labelName={`Days supply`}
          placeholder={"5"}
          type={"number"}
          className={"flex flex-col gap-2 rounded-md"}
          innerTextClass={"border-none px-2 rounded-md"}
          required={true}
          value={watchMeds[index].days_supply}
        />
      </div>
      <div className="w-full flex items-start justify-between gap-2">
        <HeSearchableSelect
          form={form}
          fieldName={`${fieldName}[${index}].dispense_unit`}
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
          value={watchMeds[index].dispense_unit}
        />
        <HeSearchableSelect
          form={form}
          fieldName={`${fieldName}[${index}].route`}
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
          value={watchMeds[index].route}
        />
      </div>
      <HeTextInput
        form={form}
        fieldName={`${fieldName}[${index}].frequency`}
        labelName={`Directions`}
        placeholder={"Take..."}
        className={"flex flex-col gap-2 rounded-md"}
        innerTextClass={"border-none px-2 rounded-md"}
        value={watchMeds[index].frequency}
      />
      <HeRadioButtonTrueFalse
        form={form}
        fieldName={`${fieldName}[${index}].substitutions_allowed`}
        labelName={`Allow Substitution`}
        className={"md:w-1/2"}
        value1={"Yes"}
        value2={"No"}
        value={watchMeds[index].substitutions_allowed}
      />
      <div className="flex flex-col md:flex-row items-start gap-2">
        <div className="w-full md:w-1/2">
          {showOrdRea ? (
            <HeTextInput
              form={form}
              fieldName={`${fieldName}[${index}].reason`}
              labelName={`Order/Reason`}
              placeholder={"Notes..."}
              className={"flex flex-col gap-2 rounded-md"}
              innerTextClass={"border-none px-2 rounded-md"}
              value={watchMeds[index].reason}
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
              fieldName={`${fieldName}[${index}].pharmacy_notes`}
              labelName={`Pharmacy Notes`}
              placeholder={"Notes..."}
              className={"flex flex-col gap-2 rounded-md"}
              innerTextClass={"border-none px-2 rounded-md"}
              value={watchMeds[index].pharmacy_notes}
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

export default AddMed;
