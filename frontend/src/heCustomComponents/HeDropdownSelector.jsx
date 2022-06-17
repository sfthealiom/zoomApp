import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

const HeDropdownSelector = ({
  form,
  fieldName,
  labelValue,
  dataArray,
  placeholder,
  required,
  className,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          {labelValue && (
            <FormLabel className="font-semibold">
              {labelValue} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="font-semibold select-none max-h-48 overflow-auto">
              {dataArray?.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item.toString()}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeDropdownSelector;
