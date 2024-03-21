/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";
import ViewOrder from "../reviewSections/viewCards/ViewOrder";

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
        <HeCopy
          targetText={JSON.stringify(orderNotes?.map((item) => item?.display))}
          targetId={"orders"}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-2">
          {orderNotes?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {orderNotes?.map((item, index) => {
                return (
                  <ViewOrder
                    key={index}
                    code={item?.code}
                    code_value={item?.display || item?.code_value}
                    value={item?.order_fulfillment}
                  />
                );
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

export default OrderNotes;
