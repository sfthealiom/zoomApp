/** library imports */
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/** custom imports */
import { HeHeading2, HeTextarea } from "../../../heCustomComponents";

/** shadcn import */
import { Form } from "../../../components/ui/Form";

/** redux imports */

const CareTaskDirectives = () => {
  const careTaskSchema = z.object({
    notes: z.string().optional(),
  });
  const FormSchema = z.object({
    procDone: z.array(careTaskSchema).optional(),
  });
  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      notes: "Notes explaining care task.....",
    },
  });

  const handleData = (data, e) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleData)}>
        <div className="w-full flex flex-col gap-2">
          <HeHeading2
            title={"Care Task and Directives"}
            className={`md:text-[18px]`}
          />
          <HeTextarea
            form={form}
            fieldName={`notes`}
            placeholder={"Sometimes I feel..."}
            innerTextClass={"border-slate-200"}
          />
        </div>
      </form>
    </Form>
  );
};

export default CareTaskDirectives;
