/** library imports */
import React from "react";

/** custom imports */
import { HeAutoCompleteSearch, HeHeading2 } from "../../../heCustomComponents";
import AddOrder from "./addCards/AddOrder";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const Orders = ({ form }) => {
  const watchOrders = form.watch("orders");

  const { autoCompleteDataLabs } = useSelector((state) => state.authReducer);
  const attributes = {
    orderReason: "",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Orders (Labs, Imaging and Procedures to be done)"}
          className={`md:text-[18px]`}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        {watchOrders?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {watchOrders?.map((item, index) => {
              return (
                <AddOrder
                  key={index}
                  form={form}
                  fieldName={"orders"}
                  index={index}
                  item={item}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No orders added.</p>
        )}
        <HeAutoCompleteSearch
          form={form}
          fieldName={"orders"}
          searchType={"procedures"}
          dataArray={autoCompleteDataLabs}
          attributes={attributes}
        />
      </div>
    </div>
  );
};

export default Orders;
