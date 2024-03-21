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
  type,
  fieldName,
  labelName,
  placeholder,
  disabledStatus,
  required = false,
  className,
  maxLength,
  innerTextClass,
  value,
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
              type={type ? type : "text"}
              maxLength={maxLength}
              className={`${innerTextClass}`}
              placeholder={placeholder}
              {...field}
              disabled={disabledStatus}
              value={value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeTextInput;
