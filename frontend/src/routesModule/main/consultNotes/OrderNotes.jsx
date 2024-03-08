/** library imports */
import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import {
  HeAutoCompleteSearch,
  HeCopy,
  HeHeading2,
} from "../../../heCustomComponents";

/** shadcn import */

/** redux imports */

const OrderNotes = ({ orderNotes }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Orders (Labs, Imaging and Procedures to be done)"}
          className={`md:text-[18px]`}
        />
        <HeCopy targetText={JSON.stringify(orderNotes)} targetId={"orders"} />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          {orderNotes?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {orderNotes?.map((item, index) => {
                return <OrderRec data={item} key={index} />;
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No medications added.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderRec = () => {
  return null;
};

export default OrderNotes;
