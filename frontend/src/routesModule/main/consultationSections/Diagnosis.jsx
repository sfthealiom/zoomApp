/** library imports */
import React, { useState } from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import {
  HeHeading2,
  HeHeading3,
  HePopupMessage,
} from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
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

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      {/* relevant previous diagnoses */}
      {/* <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Relevant Previous Diagnoses"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-y-scroll flex flex-col gap-2 scrollbar p-2 rounded-md">
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
      </div> */}

      {/* all previous diagnoses */}
      {/* <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"All Previous Diagnoses"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar bg-gray-100 p-2 rounded-md">
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
                    pillColor={companyMetaData?.accentWhite}
                  />
                );
              })
            : null}
        </div>
      </div> */}

      {/* differential diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Differential Diagnoses (DDx)"}
            className={`md:text-[18px]`}
          />
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
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
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar px-2 pb-2">
            {diagnoses.length > 0
              ? diagnoses?.map((item, index) => {
                  return (
                    <Pill
                      key={index}
                      code={item?.code}
                      name={item?.code_value}
                      icon={<FontAwesomeIcon icon={faPlus} />}
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
        <div className="relative flex justify-between items-center">
          <HeHeading2
            title={"Working Diagnoses"}
            className={`md:text-[18px]`}
          />
          <div className="relative flex items-center gap-2">
            {showPopup && (
              <HePopupMessage
                setShowPopup={setShowPopup}
                message={`Select your patient's working diagnoses from the previously selected previous diagnoses and differential diagnoses.`}
                className={`absolute top-1/2 right-full min-w-[280px] select-none`}
                style={{
                  backgroundColor: companyMetaData?.primaryLight,
                }}
              />
            )}
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="h-5 w-5 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            />
          </div>
        </div>
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
          {diagnoses.length > 0
            ? diagnoses?.map((item, index) => {
                return (
                  <CheckboxPill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
