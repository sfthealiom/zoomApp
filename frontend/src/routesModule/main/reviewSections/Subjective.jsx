/** library imports */
import React, { useState, useEffect, useRef } from "react";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

const Subjective = ({ form }) => {
  const watchSubjective = form.watch("subjective");

  const [edit, setEdit] = useState(false);

  const subRef = useRef(null);
  useEffect(() => {
    if (subRef) {
      subRef.current?.focus();
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Subjective Summary"} className={`md:text-[18px]`} />
        {!edit ? (
          <FontAwesomeIcon
            icon={faEdit}
            className="cursor-pointer h-5 w-5 text-gray-500"
            onClick={() => setEdit(true)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCheck}
            className="cursor-pointer h-5 w-5 text-gray-500"
            onClick={() => setEdit(false)}
          />
        )}
      </div>
      <div className="rounded-md">
        {watchSubjective?.length > 0 ? (
          <HeTextarea
            form={form}
            fieldName={`subjective`}
            disabledStatus={!edit}
            placeholder={"Sometimes I feel..."}
            innerTextClass={
              "border-slate-300 min-h-[120px] disbled:cursor-not-allowed"
            }
          />
        ) : edit ? (
          <HeTextarea
            form={form}
            fieldName={`subjective`}
            placeholder={"Sometimes I feel..."}
            innerTextClass={"border-slate-300 min-h-[120px]"}
          />
        ) : (
          <span className="text-sm text-slate-500">
            No Subjective notes added.
          </span>
        )}
      </div>
    </div>
  );
};

export default Subjective;
