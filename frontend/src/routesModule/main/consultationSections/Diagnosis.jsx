/** library imports */
import React, { useState } from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import {
  HeAISuggesstions,
  HeAutoCompleteSearch,
  HeHeading2,
  HePopupMessage,
  HeTextInput,
} from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { CheckboxPill, Pill } from "../../../components/helpers";

/** shadcn imports */

/** redux imports */
import { useSelector } from "react-redux";

const Diagnosis = ({ form, aiData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { autoCompleteDataDiagnoses } = useSelector(
    (state) => state.authReducer
  );

  const watchDiffDiag = form.watch("diffDiag");
  const watchWorkDiag = form.watch("workDiag");

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
                    name={item?.display}
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
                    name={item?.display}
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
          {watchDiffDiag.length > 0 ? (
            watchDiffDiag?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col rounded-md"
                  style={{
                    backgroundColor: companyMetaData?.accentOneLight,
                  }}
                >
                  <Pill
                    code={item?.code}
                    name={item?.display}
                    className="px-0 py-0"
                    icon={<FontAwesomeIcon icon={faXmark} />}
                    onIconClick={() => {
                      const previousValues = watchDiffDiag;
                      const updatedArray = previousValues?.filter(
                        (item, idx) => {
                          return idx !== index;
                        }
                      );
                      form.setValue("diffDiag", updatedArray);
                    }}
                  />
                  <HeTextInput
                    form={form}
                    fieldName={`diffDiag[${index}].reason`}
                    labelName={"Reason"}
                    placeholder={"Notes..."}
                    className={"flex flex-col gap-2 rounded-md px-4 pb-2"}
                    innerTextClass={"border-none px-2 rounded-md"}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              No differential diagnoses added.
            </p>
          )}
        </div>
        <HeAutoCompleteSearch
          form={form}
          fieldName={"diffDiag"}
          searchType={"diagnoses"}
          dataArray={autoCompleteDataDiagnoses}
          attributes={{ reason: "" }}
        />
        <HeAISuggesstions
          form={form}
          fieldName={"diffDiag"}
          prevValue={watchDiffDiag}
          aiData={aiData}
          attributes={{ reason: "" }}
        />
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
          {watchDiffDiag.length > 0 ? (
            watchDiffDiag?.map((item, index) => {
              return (
                <CheckboxPill
                  key={index}
                  index={index}
                  code={item?.code}
                  name={item?.display}
                  form={form}
                  fieldName={"workDiag"}
                  prevValue={watchWorkDiag}
                />
              );
            })
          ) : (
            <p className="text-sm text-slate-500">
              No working diagnoses added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
