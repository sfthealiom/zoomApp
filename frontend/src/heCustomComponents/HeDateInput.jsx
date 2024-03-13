import React, { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";

const HeDateInput = ({
  form,
  fieldName,
  labelName,
  disabledStatus,
  className,
  defaultVal,
  innerTextClass,
  required = false,
}) => {
  const watchDate = form.watch(fieldName);
  useEffect(() => {
    let input = watchDate?.replace(/\D/g, "") || "";
    if (input?.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    if (input.length > 5) {
      input = `${input.slice(0, 5)}/${input.slice(5)}`;
    }
    form.setValue(fieldName, input);
  }, [watchDate, form, fieldName]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      defaultValue={""}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          <FormLabel className="text-slate-500">
            {labelName} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="tel"
              maxLength={10}
              className={`font-semibold ${innerTextClass}`}
              placeholder="MM/DD/YYYY"
              disabled={disabledStatus}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeDateInput;
