/** library imports */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/** custom imports */
import { HeHeading2 } from "../../../heCustomComponents";

/** shadcn import */
import { Form } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import AddOrder from "./addCards/AddOrder";

const Orders = () => {
  const dispatch = useDispatch();
  const { currentUserData, jwtToken, staticData } = useSelector(
    (state) => state.authReducer
  );

  const [search, setSearch] = useState("");
  const ordersSchema = z.object({
    code: z.string().min(1, "Required"),
    value: z.string().min(1, "Required"),
    inClinic: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
  });
  const FormSchema = z.object({
    orders: z.array(ordersSchema).min(1, "Required"),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      orders: [
        {
          code: "00000000",
          value: "Lab Test",
          inClinic: false,
        },
        {
          code: "00000000",
          value: "Procedure",
          inClinic: false,
        },
      ],
    },
  });
  const watchOrders = form.watch("orders");

  const handleData = (data, e) => {
    console.log(data);
  };

  useEffect(() => {
    // dispatch(autoCompleteSearch("labs", search));
  }, [search]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.reset, form.formState.isSubmitSuccessful]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2
          title={"Orders (Labs, Imaging, and Procedures to be done)"}
          className={`md:text-[18px]`}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleData)}
          className="w-full flex flex-col gap-2"
        >
          {watchOrders?.length > 0 && (
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
          )}
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Start typing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-md px-4 py-3 h-10"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Orders;
