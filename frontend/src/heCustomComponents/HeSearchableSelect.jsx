import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../components/lib/utils";
import { Button } from "../components/ui/Button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/Popover";
import { PopoverClose } from "@radix-ui/react-popover";

const HeSearchableSelect = ({
  form,
  fieldName,
  labelName,
  disabledStatus,
  dataArray,
  className,
  inputTextClass,
  buttonClasses,
  commandClass,
  placeholder = "Search...",
  required = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full flex flex-col ${className}`}>
          {labelName && (
            <FormLabel className="text-slate-500">
              {labelName} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="input"
                  disabled={disabledStatus}
                  className={`w-full h-8 bg-transparent justify-between rounded-none border-slate-500 text-sm font-semibold placeholder:text-slate-400 p-0 m-0 
                    ${!field.value && "text-slate-400"} ${buttonClasses}`}
                >
                  <div>
                    {field.value
                      ? dataArray.find((item) => item.id === field.value)?.item
                      : placeholder}
                  </div>
                  {!disabledStatus && (
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full h-[220px] p-0 bg-white">
              <Command className={`w-[300px] ${commandClass}`}>
                <CommandInput
                  placeholder={"Search..."}
                  className={`placeholder:text-slate-400 font-semibold  ${inputTextClass}`}
                />
                <CommandEmpty>No result(s) found.</CommandEmpty>
                <PopoverClose asChild>
                  <CommandGroup className="overflow-y-scroll">
                    {dataArray.map((item) => (
                      <CommandItem
                        value={item.item}
                        key={item.item}
                        className="font-semibold"
                        onSelect={() => {
                          form.setValue(fieldName, item.id);
                          form?.clearErrors(fieldName);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.item === field.item
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </PopoverClose>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeSearchableSelect;
