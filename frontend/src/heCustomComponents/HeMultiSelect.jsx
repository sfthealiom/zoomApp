import * as React from "react";
import { cn } from "../components/lib/utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/Command";
import { companyMetaData } from "../assets/myCompanyData.js";

const HeMultiSelect = React.forwardRef(
  ({ options, selected, onChange, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item) => {
      onChange(selected.filter((i) => i !== item));
    };

    return (
      <div className="h-full">
        {selected && (
          <div
            role="combobox"
            aria-expanded={open}
            className={`w-full flex justify-between items-center`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-2 flex-wrap">
              {selected.map((item) => (
                <div
                  style={{
                    color: companyMetaData?.accentBlack,
                    backgroundColor: companyMetaData.accentOneLight,
                  }}
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md cursor-pointer"
                  onClick={() => handleUnselect(item)}
                >
                  {item}
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="h-3 w-3 p-1 rounded-md text-white"
                    style={{
                      backgroundColor: companyMetaData?.accentOne,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <Command className={`${className} mt-2`}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] md:max-h-[220px] overflow-auto mx-2 my-1">
            {options.map((option) => (
              <CommandItem
                key={option.id}
                className="my-1 py-3 rounded-md font-semibold"
                style={{
                  backgroundColor: companyMetaData?.accentOneLight,
                }}
                onSelect={() => {
                  onChange(
                    selected.includes(option.id)
                      ? selected.filter((item) => item !== option.id)
                      : [...selected, option.id]
                  );
                  setOpen(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.item) ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        {/* <p className="text-xs text-center text-slate-400 mt-2">
          Click on any item to remove from the list
        </p> */}
      </div>
    );
  }
);

export default HeMultiSelect;
