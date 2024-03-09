import React from "react";
import { companyMetaData } from "../../assets/myCompanyData";
import { Checkbox } from "../../components/ui/Checkbox";

const CheckboxPill = ({
  form,
  fieldName,
  prevValue,
  code,
  name,
  pillColor,
  textColor,
}) => {
  return (
    <div
      className="w-full h-fit rounded-md flex flex-col lg:flex-row gap-1  lg:gap-4 items-start justify-between px-4 py-2 text-sm"
      style={{
        backgroundColor: pillColor || companyMetaData?.accentOneLight,
      }}
    >
      <div className="flex items-start gap-2">
        <Checkbox
          className="bg-white border border-slate-500 rounded-sm"
          onCheckedChange={(checked) => {
            if (checked) {
              form.setValue(fieldName, [
                ...prevValue,
                {
                  code: code,
                  display: name,
                },
              ]);
            } else {
              const updatedArray = prevValue?.filter((item, idx) => {
                return code !== item?.code;
              });
              form.setValue(fieldName, [...updatedArray]);
            }
          }}
        />
        <div className="flex flex-col">
          <h1
            title={name}
            className="font-semibold text-wrap"
            style={{
              color: textColor || "black",
            }}
          >
            {name}
          </h1>
          <div
            className="md:hidden"
            style={{
              color: textColor || "black",
            }}
          >
            <h2>{code?.split(":")[1] || code}</h2>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block self-end md:self-start"
        style={{
          color: textColor || "black",
        }}
      >
        <h2>{code?.split(":")[1] || code}</h2>
      </div>
    </div>
  );
};

export default CheckboxPill;
