/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import { HeHeading2, HeHeading3 } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faWandMagicSparkles,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { AIProcessPill, CheckboxPill, Pill } from "../../../components/helpers";
import data from "./data.json";

/** shadcn imports */
import { Input } from "../../../components/ui/Input";

const Diagnosis = () => {
  let diagnoses = data?.ai_preds?.entities?.diagnoses;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* relevant previous diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Relevant Previous Diagnoses"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-[200px] overflow-scroll flex flex-col gap-2 scrollbar bg-gray-200 p-2 rounded-md">
          {diagnoses.length > 0
            ? diagnoses?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
                    icon={
                      <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                    }
                  />
                );
              })
            : null}
        </div>
      </div>

      {/* all previous diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"All Previous Diagnoses"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-[200px] overflow-scroll flex flex-col gap-2 scrollbar bg-gray-200 p-2 rounded-md">
          {diagnoses.length > 0
            ? diagnoses?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
                    icon={
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: companyMetaData?.accentOne }}
                      />
                    }
                  />
                );
              })
            : null}
        </div>
      </div>

      {/* all previous diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Differential Diagnoses (DDx)"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-[200px] overflow-scroll flex flex-col gap-2 scrollbar bg-gray-200 p-2 rounded-md">
          {diagnoses.length > 0
            ? diagnoses?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
                    icon={<FontAwesomeIcon icon={faXmark} />}
                  />
                );
              })
            : null}
        </div>
        <Input
          placeholder="Start typing..."
          className="border border-slate-200 rounded-md px-4 py-3 h-10"
        />
        <div
          className="flex flex-col gap-2 rounded-md"
          style={{
            backgroundColor: companyMetaData?.aiLight,
            color: companyMetaData?.aiDark,
          }}
        >
          <div className="flex gap-1 items-center px-2 pt-2">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="h-4 w-4" />
            <HeHeading3
              title={"AI Suggesstions"}
              className={`md:text-[18px]`}
            />
          </div>
          <div className="w-full h-[200px] overflow-scroll flex flex-col gap-2 scrollbar px-2 pb-2">
            {diagnoses.length > 0
              ? diagnoses?.map((item, index) => {
                  return (
                    <Pill
                      key={index}
                      code={item?.code}
                      name={item?.code_value}
                      icon={<FontAwesomeIcon icon={faXmark} />}
                      pillColor={companyMetaData?.accentWhite}
                      textColor={companyMetaData?.aiDark}
                    />
                  );
                })
              : null}
            <AIProcessPill />
          </div>
        </div>
      </div>

      {/* working diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Working Diagnoses"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-[200px] overflow-scroll flex flex-col gap-2 scrollbar bg-gray-200 p-2 rounded-md">
          {diagnoses.length > 0
            ? diagnoses?.map((item, index) => {
                return (
                  <div>
                    <CheckboxPill
                      key={index}
                      code={item?.code}
                      name={item?.code_value}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
