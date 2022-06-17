import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Input } from "../components/ui/Input";
import { HeHeading3 } from ".";

const HeHeightInput = ({
  form,
  type = "tel",
  disabledStatus,
  heightType,
  setHeightType,
  required = false,
  className,
}) => {
  return (
    <div className="flex gap-4 justify-between items-start">
      <div className="w-full flex flex-col gap-1 items-end justify-between">
        <h1 className="text-sm text-slate-500 font-semibold self-start">
          Height {required && <span className="text-red-500">*</span>}
        </h1>
        {heightType === "inch" ? (
          <div className="w-full flex items-start gap-4">
            <FormField
              control={form.control}
              defaultValue={""}
              name={"height_in_ft"}
              render={({ field }) => (
                <FormItem className={`w-1/2 ${className}`}>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type={type}
                        className="font-semibold"
                        maxLength={2}
                        placeholder={6}
                        {...field}
                        disabled={disabledStatus}
                      />
                    </FormControl>
                    <HeHeading3 title={"foot"} className={"self-center"} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"height_in_inch"}
              defaultValue={""}
              render={({ field }) => (
                <FormItem className={`w-1/2 ${className}`}>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        type={type}
                        className="font-semibold"
                        maxLength={2}
                        placeholder={1}
                        {...field}
                        disabled={disabledStatus}
                      />
                    </FormControl>
                    <HeHeading3 title={"inch"} className={"self-center"} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <FormField
            control={form.control}
            name={"height_in_cms"}
            defaultValue={""}
            render={({ field }) => (
              <FormItem className={`w-full ${className}`}>
                <FormControl>
                  <Input
                    type={type}
                    maxLength={3}
                    className="font-semibold"
                    placeholder={150}
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
      <div>
        <h1 className="font-semibold text-sm text-slate-400">Unit</h1>
        <div className="flex items-center">
          <div className="">
            <input
              type="radio"
              id={`inch`}
              name="heightTypeName"
              className="sr-only peer"
              value={"inch"}
              checked={heightType === "inch"}
              onChange={() => {
                setHeightType("inch");
              }}
            />
            <label
              htmlFor={`inch`}
              className="flex items-center justify-center w-[50px] font-semibold text-sm text-slate-500 border border-slate-300 rounded-l-md px-2 py-3 peer-checked:border-slate-500 peer-checked:bg-slate-200 cursor-pointer"
            >
              inch
            </label>
          </div>
          <div className="">
            <input
              type="radio"
              id={`cms`}
              name="heightTypeName"
              className="sr-only peer"
              value={heightType}
              checked={heightType === "cms"}
              onChange={() => {
                setHeightType("cms");
              }}
            />
            <label
              htmlFor={`cms`}
              className="flex items-center justify-center w-[50px] font-semibold text-sm text-slate-500 border border-slate-300 rounded-r-md px-2 py-3 peer-checked:border-slate-500 peer-checked:bg-slate-200 cursor-pointer"
            >
              cms
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeHeightInput;
