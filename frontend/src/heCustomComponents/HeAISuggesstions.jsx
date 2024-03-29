import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

import HeHeading3 from "./HeHeading3";
import { companyMetaData } from "../assets/myCompanyData";
import { AIProcessPill, Pill } from "../components/helpers";

const HeAISuggesstions = ({
  form,
  fieldName,
  fieldName2,
  prevValue,
  prevValue2,
  aiData,
  attributes,
}) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-md"
      style={{
        backgroundColor: companyMetaData?.aiLight,
        color: companyMetaData?.aiDark,
      }}
    >
      <div className="flex gap-1 items-center px-2 pt-2">
        <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
        <HeHeading3 title={"AI Suggesstions"} className={`md:text-[18px]`} />
      </div>
      <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar px-2 pb-2">
        {aiData.length > 0
          ? aiData?.map((item, index) => {
              return (
                <Pill
                  key={index}
                  code={item?.code}
                  name={item?.code_value}
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  pillColor={companyMetaData?.accentWhite}
                  textColor={
                    form
                      ?.getValues(fieldName)
                      ?.some((fieldItem) => fieldItem?.code === item?.code)
                      ? companyMetaData?.aiDeselect
                      : companyMetaData?.aiDark
                  }
                  onPress={() => {
                    const previousValues = form?.getValues(fieldName);
                    const existingItems = previousValues.filter(
                      (prev) => prev.code === item?.code
                    );
                    if (!existingItems.length) {
                      form.setValue(fieldName, [
                        {
                          code: item?.code,
                          display: item?.code_value,
                          ...attributes,
                        },
                        ...previousValues,
                      ]);
                      if (fieldName2) {
                        form.setValue(fieldName2, [
                          {
                            code: item?.code,
                            display: item?.code_value,
                          },
                          ...previousValues,
                        ]);
                      }
                    }
                  }}
                />
              );
            })
          : null}
        <AIProcessPill />
      </div>
    </div>
  );
};

export default HeAISuggesstions;
