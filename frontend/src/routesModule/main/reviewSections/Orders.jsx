/** library imports */
import React, { useState } from "react";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** custom imports */
import { HeAutoCompleteSearch, HeHeading2 } from "../../../heCustomComponents";
import EditOrder from "./editCards/EditOrder";
import ViewOrder from "./viewCards/ViewOrder";

/** shadcn import */

/** redux imports */
import { useSelector } from "react-redux";

const Orders = ({ form }) => {
  const watchOrders = form.watch("orders");

  const { autoCompleteDataLabs } = useSelector((state) => state.authReducer);
  const attributes = {
    order_fulfilment: "",
  };

  const [edit, setEdit] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Orders (Labs, Imaging and Procedures to be done)"}
          className={`md:text-[18px]`}
        />
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
      <div className="w-full flex flex-col gap-2">
        {edit ? (
          watchOrders?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {watchOrders?.map((item, index) => {
                return (
                  <EditOrder
                    key={index}
                    form={form}
                    fieldName={"orders"}
                    index={index}
                    item={item}
                    value={watchOrders[index].order_fulfilment}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No orders added.</p>
          )
        ) : watchOrders?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {watchOrders?.map((item, index) => {
              return (
                <ViewOrder
                  key={index}
                  code={item?.code}
                  code_value={item?.display}
                  data={item?.inClinic}
                  value={watchOrders[index].order_fulfilment}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No orders added.</p>
        )}
        {edit && (
          <HeAutoCompleteSearch
            form={form}
            fieldName={"orders"}
            searchType={"procedures"}
            dataArray={autoCompleteDataLabs}
            attributes={attributes}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
