/** library imports */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Check, ChevronsUpDown } from "lucide-react";

/** curtom imports */
import { cn } from "../components/lib/utils";
import { companyMetaData } from "../assets/myCompanyData";

/** shadcn imports */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import { Command, CommandGroup, CommandItem } from "../components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

function HeCommandFormSelector({
  form,
  fieldName,
  labelName,
  required,
  dataArray,
  className,
  setSearch,
  disabledStatus,
  buttonClasses,
  placeholder = "Search...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selfValue, setSelfValue] = useState("");

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  React.useEffect(() => {
    const el = document.getElementById("autocomplete-data-array");
    if (el) {
      el.scrollTo(0, 0);
    }
  }, [dataArray]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={`w-full md:w-1/2 flex flex-col space-y-0 ${className}`}
        >
          {labelName && (
            <FormLabel className="text-slate-500 mb-2">
              {labelName} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="input"
                  disabled={disabledStatus}
                  className={`w-full h-8 bg-transparent overflow-hidden justify-between border-b rounded-none border-slate-500 text-sm font-semibold placeholder:text-slate-400 p-0 m-0
                    ${!field.value && "text-slate-400"} ${buttonClasses}`}
                >
                  <h1 className="">
                    {field.value?.value ? (
                      field?.value?.value
                    ) : (
                      <span className="text-slate-400">{placeholder}</span>
                    )}
                  </h1>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full h-[220px] p-0">
              <Command
                className={`w-[300px] border border-slate-300 rounded-t-md`}
              >
                <div
                  className={cn(
                    `w-full flex h-10 bg-white items-center justify-between  ${
                      dataArray?.length > 0 ? " rounded-t-md" : "rounded-t-md"
                    } px-4 py-2 border-b`
                  )}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-4 w-4 mr-2 text-slate-500"
                  />
                  <Input
                    className="border-none"
                    value={field.value?.value}
                    placeholder={`Search...`}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      form.setValue(`${fieldName}.value`, e.target.value);
                    }}
                  />
                  {field.value?.value?.length >= 2 && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="h-4 w-4 rounded-md p-1 cursor-pointer text-white"
                      style={{ backgroundColor: companyMetaData?.accentOne }}
                      onClick={() => {
                        setSearch("");
                        form.setValue(`${fieldName}.value`, "");
                      }}
                    />
                  )}
                </div>
                {dataArray?.length > 0 ? (
                  <PopoverClose asChild>
                    <CommandGroup
                      className="max-h-64 overflow-auto border-b"
                      id="autocomplete-data-array"
                    >
                      {dataArray.map((option) => (
                        <CommandItem
                          key={option.id}
                          className="my-1 py-3 rounded-md font-semibold cursor-pointer"
                          style={{
                            backgroundColor: companyMetaData?.accentOneLight,
                          }}
                          onSelect={() => {
                            setSearch(option.item);
                            form.setValue(`${fieldName}.code`, option.id);
                            form.setValue(`${fieldName}.value`, option.item);
                          }}
                        >
                          {option.item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </PopoverClose>
                ) : null}
                <CommandItem
                  className="m-1 py-3 flex h-10 bg-white items-center justify-between px-4 rounded-md"
                  style={{
                    backgroundColor: companyMetaData?.accentOneLight,
                  }}
                >
                  <Input
                    className="border-none bg-transparent"
                    value={selfValue}
                    placeholder={`Handle Else`}
                    onChange={(e) => {
                      setSelfValue(e.target.value);
                    }}
                  />
                  <PopoverClose asChild>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="h-4 w-4 rounded-md p-1 cursor-pointer text-white"
                      style={{ backgroundColor: companyMetaData?.accentOne }}
                      onClick={() => {
                        form.setValue(`${fieldName}.code`, "IIFC");
                        form.setValue(`${fieldName}.value`, selfValue);
                      }}
                    />
                  </PopoverClose>
                </CommandItem>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default HeCommandFormSelector;
