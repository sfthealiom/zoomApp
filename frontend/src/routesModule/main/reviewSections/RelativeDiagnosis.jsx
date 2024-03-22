/** library imports */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

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

const RelativeDiagnoses = ({ form }) => {
  const diffDiag = form.watch("relativeDiagnoses");

  const { autoCompleteRelativeDataDiagnoses } = useSelector(
    (state) => state.authReducer
  );

  const [editDiffDiag, setEditDiffDiag] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 md:gap-12">
      {/* Relative diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <HeHeading2
            title={"Relevant Previous Diagnoses"}
            className={`md:text-[18px]`}
          />
          {!editDiffDiag ? (
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer h-5 w-5 text-gray-500"
              onClick={() => setEditDiffDiag(true)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              className="cursor-pointer h-5 w-5 text-gray-500"
              onClick={() => setEditDiffDiag(false)}
            />
          )}
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
                        form.setValue("relativeDiagnoses", updatedArray);
                      }}
                    />
                    <HeTextInput
                      form={form}
                      fieldName={`relativeDiagnoses[${index}].reason`}
                      labelName={"Reason"}
                      placeholder={"Notes..."}
                      className={"flex flex-col gap-2 rounded-md px-4 pb-2"}
                      innerTextClass={"border-none px-2 rounded-md"}
                      value={diffDiag[index].reason}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500">
                No Relevant Previous diagnoses added.
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
                      backgroundColor: companyMetaData?.accentGray,
                    }}
                  >
                    <Pill
                      code={item?.code}
                      name={item?.display}
                      pillColor={companyMetaData?.accentGray}
                      className="px-0 py-0"
                      icon={<FontAwesomeIcon icon={faXmark} />}
                      onIconClick={() => {
                        const previousValues = diffDiag;
                        const updatedArray = previousValues?.filter(
                          (item, idx) => {
                            return idx !== index;
                          }
                        );
                        form.setValue("relativeDiagnoses", updatedArray);
                      }}
                    />
                    <HeTextInput
                      form={form}
                      fieldName={`diffDiag[${index}].reason`}
                      labelName={"Reason"}
                      placeholder={"Notes..."}
                      disabledStatus={true}
                      className={"flex flex-col gap-2 rounded-md px-4 pb-2"}
                      innerTextClass={"border-none px-2 rounded-md"}
                      value={diffDiag[index].reason}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500">
                No Relevant Previous diagnoses added.
              </p>
            )}
          </div>
        )}
        {editDiffDiag && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"relativeDiagnoses"}
            searchType={"relativeDiagnoses"}
            dataArray={autoCompleteRelativeDataDiagnoses}
            attributes={{ reason: "" }}
          />
        )}
      </div>
    </div>
  );
};

export default RelativeDiagnoses;
