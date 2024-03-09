/** library imports */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import {
  HeAutoCompleteSearch,
  HeHeading2,
  HeTextInput,
} from "../../../heCustomComponents";
import { Pill } from "../../../components/helpers";

/** shadcn imports */

/** redux imports */
import { useSelector } from "react-redux";

const Diagnosis = ({ form }) => {
  const diffDiag = form.watch("diffDiag");
  const workDiag = form.watch("workDiag");

  const { autoCompleteDataDiagnoses } = useSelector(
    (state) => state.authReducer
  );

  const [editDiffDiag, setEditDiffDiag] = useState(false);
  const [editWorkDiag, setEditWorkDiag] = useState(false);

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
          {!editDiffDiag ? (
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer h-5 w-5 text-slate-300"
              onClick={() => setEditDiffDiag(true)}
            />
          ) : null}
        </div>
        {editDiffDiag ? (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {diffDiag.length > 0 ? (
              diffDiag?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col rounded-md"
                    style={{
                      backgroundColor: companyMetaData?.accentOneLight,
                    }}
                  >
                    <Pill
                      key={index}
                      code={item?.code}
                      name={item?.display}
                      className="px-0 py-0"
                      icon={<FontAwesomeIcon icon={faXmark} />}
                      onIconClick={() => {
                        const previousValues = diffDiag;
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
        ) : (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {diffDiag.length > 0 ? (
              diffDiag?.map((item, index) => {
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
                        const previousValues = diffDiag;
                        const updatedArray = previousValues?.filter(
                          (item, idx) => {
                            return idx !== index;
                          }
                        );
                        form.setValue("diffDiag", updatedArray);
                        form.setValue("workDiag", updatedArray);
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
        )}
        {editDiffDiag && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"diffDiag"}
            fieldName2={"workDiag"}
            searchType={"diagnoses"}
            dataArray={autoCompleteDataDiagnoses}
            attributes={{ reason: "" }}
          />
        )}
      </div>

      {/* working diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <HeHeading2
            title={"Working Diagnoses"}
            className={`md:text-[18px]`}
          />
          {!editWorkDiag ? (
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer h-5 w-5 text-slate-300"
              onClick={() => setEditWorkDiag(true)}
            />
          ) : null}
        </div>
        {editWorkDiag ? (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {workDiag.length > 0 ? (
              workDiag?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.display}
                    icon={<FontAwesomeIcon icon={faXmark} />}
                    onIconClick={() => {
                      const previousValues = workDiag;
                      const updatedArray = previousValues?.filter(
                        (item, idx) => {
                          return idx !== index;
                        }
                      );
                      form.setValue("workDiag", updatedArray);
                    }}
                  />
                );
              })
            ) : (
              <p className="text-sm text-slate-500">
                No working diagnoses added.
              </p>
            )}
          </div>
        ) : (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {workDiag.length > 0 ? (
              workDiag?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.display}
                    pillColor={companyMetaData?.accentGray}
                  />
                );
              })
            ) : (
              <p className="text-sm text-slate-500">
                No working diagnoses added.
              </p>
            )}
          </div>
        )}
        {editWorkDiag && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"workDiag"}
            searchType={"diagnoses"}
            dataArray={autoCompleteDataDiagnoses}
          />
        )}
      </div>
    </div>
  );
};

export default Diagnosis;
