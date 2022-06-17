import React from "react";
import { Checkbox } from "../components/ui/Checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";

const HeCheckboxInput = ({
  form,
  fieldName,
  labelName,
  className,
  required,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-start space-x-3 space-y-0 p-2 ${className}`}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            {labelName && <FormLabel>{labelName}</FormLabel>}{" "}
            {required && <span className="text-red-500">*</span>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeCheckboxInput;
