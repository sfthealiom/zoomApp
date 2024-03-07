/** library imports */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import {
  HeCopy,
  HeHeading2,
  HePopupMessage,
} from "../../../heCustomComponents";
import { Pill } from "../../../components/helpers";

/** shadcn imports */

const Diagnosis = ({ form }) => {
  const [showPopup, setShowPopup] = useState(false);

  const diffDiag = form.watch("diffDiag");
  const workDiag = form.watch("workDiag");

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
          <div className="flex items-center gap-2 md:gap-4">
            <HeCopy
              targetId={"diffDiag"}
              targetText={JSON.stringify(diffDiag)}
            />
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer h-5 w-5 text-slate-300"
              onClick={() => setEditDiffDiag(true)}
            />
          </div>
        </div>
        {editDiffDiag ? (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {diffDiag.length > 0 ? (
              diffDiag?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
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
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
                    pillColor={companyMetaData?.accentGray}
                  />
                );
              })
            ) : (
              <p className="text-sm text-slate-500">
                No differential diagnoses added.
              </p>
            )}
          </div>
        )}
      </div>

      {/* working diagnoses */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <HeHeading2
            title={"Working Diagnoses"}
            className={`md:text-[18px]`}
          />
          <div className="flex items-center gap-2 md:gap-4">
            <HeCopy
              targetId={"workDiag"}
              targetText={JSON.stringify(workDiag)}
            />
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer h-5 w-5 text-slate-300"
              onClick={() => setEditWorkDiag(true)}
            />
          </div>
        </div>
        {editWorkDiag ? (
          <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar rounded-md">
            {workDiag.length > 0 ? (
              workDiag?.map((item, index) => {
                return (
                  <Pill
                    key={index}
                    code={item?.code}
                    name={item?.code_value}
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
                    name={item?.code_value}
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
      </div>
    </div>
  );
};

export default Diagnosis;
