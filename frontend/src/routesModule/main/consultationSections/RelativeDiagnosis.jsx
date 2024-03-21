/** library imports */
import React from "react";

/** custom imports */
import {
  HeAutoCompleteSearch,
  HeHeading2,
  HeTextInput,
} from "../../../heCustomComponents";
import { Pill } from "../../../components/helpers";
import { companyMetaData } from "../../../assets/myCompanyData";
/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const RelativeDiagnoses = ({ form }) => {
  const watchRelevantDiag = form.watch("relativeDiagnoses");

  const { autoCompleteRelativeDataDiagnoses } = useSelector(
    (state) => state.authReducer
  );
  const attributes = {
    orderReason: "",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Relevant Previous Diagnoses"}
          className={`md:text-[18px]`}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
          {watchRelevantDiag?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {watchRelevantDiag?.map((item, index) => {
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
                        const previousValues = watchRelevantDiag;
                        const updatedArray = previousValues?.filter(
                          (item, idx) => {
                            return idx !== index;
                          }
                        );
                        form.setValue("relativeDiagnoses", updatedArray);
                      }}
                    />
                    {console.log(
                      "we are here",
                      watchRelevantDiag[index].reason,
                      index
                    )}
                    <HeTextInput
                      form={form}
                      fieldName={`relativeDiagnoses[${index}].reason`}
                      labelName={"Reason"}
                      placeholder={"Notes..."}
                      className={"flex flex-col gap-2 rounded-md px-4 pb-2"}
                      innerTextClass={"border-none px-2 rounded-md"}
                      value={watchRelevantDiag[index].reason}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No Realtive Previous diagnoses added.
            </p>
          )}
        </div>
        <HeAutoCompleteSearch
          form={form}
          fieldName={"relativeDiagnoses"}
          searchType={"relativeDiagnoses"}
          dataArray={autoCompleteRelativeDataDiagnoses}
          attributes={{ reason: "" }}
        />
      </div>
    </div>
  );
};

export default RelativeDiagnoses;
