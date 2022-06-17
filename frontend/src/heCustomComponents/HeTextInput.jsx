import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";

const HeTextInput = ({
  form,
  type = "text",
  fieldName,
  labelName,
  placeholder,
  disabledStatus,
  required = false,
  className,
  maxLength,
  innerTextClass,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          {labelName && (
            <FormLabel className="text-slate-500">
              {labelName} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              maxLength={maxLength}
              className={`font-semibold ${innerTextClass}`}
              placeholder={placeholder}
              {...field}
              disabled={disabledStatus}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeTextInput;
