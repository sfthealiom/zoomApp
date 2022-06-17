import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";

const HeWeightInput = ({
  form,
  type = "tel",
  disabledStatus,
  weightType,
  setWeightType,
  required = false,
  className,
}) => {
  return (
    <div className="flex gap-4 justify-between items-start">
      <div className="w-full flex flex-col gap-1 items-end justify-between">
        <h1 className="text-sm text-slate-500 font-semibold self-start">
          Weight {required && <span className="text-red-500">*</span>}
        </h1>
        <div className="w-full flex gap-2 items-center justify-between">
          {weightType === "lbs" ? (
            <FormField
              control={form.control}
              name={"weight_in_lbs"}
              defaultValue={""}
              render={({ field }) => (
                <FormItem className={`w-full ${className}`}>
                  <FormControl>
                    <Input
                      type={type}
                      maxLength={3}
                      placeholder={150}
                      className="font-semibold"
                      {...field}
                      disabled={disabledStatus}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name={"weight_in_kg"}
              defaultValue={""}
              render={({ field }) => (
                <FormItem className={`w-full ${className}`}>
                  <FormControl>
                    <Input
                      type={type}
                      maxLength={3}
                      placeholder={75}
                      className="font-semibold"
                      {...field}
                      disabled={disabledStatus}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-sm text-slate-400">Unit</h1>
        <div className="flex items-center">
          <div>
            <input
              type="radio"
              id={`lbs`}
              name="weightTypeName"
              className="sr-only peer"
              value={"lbs"}
              checked={weightType === "lbs"}
              onChange={() => {
                setWeightType("lbs");
              }}
            />
            <label
              htmlFor={`lbs`}
              className="flex items-center justify-center w-[50px] font-semibold text-sm text-slate-500 border border-slate-300 rounded-l-md px-2 py-3 peer-checked:border-slate-500 peer-checked:bg-slate-200 cursor-pointer"
            >
              lbs
            </label>
          </div>
          <div>
            <input
              type="radio"
              id={`kg`}
              name="weightTypeName"
              className="sr-only peer"
              value={weightType}
              checked={weightType === "kg"}
              onChange={() => {
                setWeightType("kg");
              }}
            />
            <label
              htmlFor={`kg`}
              className="flex items-center justify-center w-[50px] font-semibold text-sm text-slate-500 border border-slate-300 rounded-r-md px-2 py-3 peer-checked:border-slate-500 peer-checked:bg-slate-200 cursor-pointer"
            >
              kg
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeWeightInput;
