import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { RadioGroup, RadioGroupItem } from "../components/ui/Radio-Group";

const HeBiologicalGender = ({
  form,
  fieldName,
  labelName,
  disabledStatus,
  className,
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          <FormLabel className="text-slate-500">
            {labelName} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl className="mt-2">
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex justify-between"
            >
              <FormItem
                className={
                  "flex items-center space-x-3 space-y-0 border border-slate-300 rounded-md w-1/2  px-4 py-3"
                }
              >
                <FormControl>
                  <RadioGroupItem value="Male" />
                </FormControl>
                <FormLabel>
                  {/* {getLabels(
                  "patOnFillingForMyself",
                  appLanguage,
                  labelData
                )} */}
                  Male
                </FormLabel>
              </FormItem>
              <FormItem
                className={
                  "flex items-center space-x-3 space-y-0 border border-slate-300 rounded-md w-1/2  px-4 py-3"
                }
              >
                <FormControl>
                  <RadioGroupItem value="Female" />
                </FormControl>
                <FormLabel>
                  {/* {getLabels(
                  "patOnFillingForMyself",
                  appLanguage,
                  labelData
                )} */}
                  Female
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeBiologicalGender;
