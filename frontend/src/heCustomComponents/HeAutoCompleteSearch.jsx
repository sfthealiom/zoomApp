import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { Pill } from "../components/helpers";

/** shadcn imports */
import { Command, CommandGroup, CommandList } from "../components/ui/Command";
import { Input } from "../components/ui/Input";
import { toast } from "sonner";

/** redux imports */
import { useDispatch } from "react-redux";
import { autoCompleteSearch } from "../reduxFolder/CommonActions";

const HeAutoCompleteSearch = ({
  form,
  fieldName,
  fieldName2,
  searchType,
  dataArray,
  attributes,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(autoCompleteSearch(searchType, search, toast));
  }, [search]);

  return (
    <Command className="rounded-md border shadow-sm">
      <div className="flex items-center border-b px-3">
        <FontAwesomeIcon
          className="mr-2 h-4 w-4 shrink-0 opacity-50"
          icon={faSearch}
        />
        <div className="flex items-center justify-between w-full">
          <Input
            className="border-none h-10"
            value={search}
            placeholder={`Start typing...`}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {search?.length > 0 && (
            <FontAwesomeIcon
              className="mr-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
              icon={faXmark}
              onClick={() => setSearch("")}
            />
          )}
        </div>
      </div>
      {dataArray?.length > 0 && (
        <CommandList>
          {dataArray?.length > 0 ? (
            <CommandGroup
              className="max-h-64 overflow-auto border-b"
              id="autocomplete-data-array"
            >
              {dataArray.map((item, idx) => (
                <Pill
                  key={idx}
                  code={item?.id}
                  name={item?.item}
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  onPress={() => {
                    const previousValues = form?.getValues(fieldName);
                    form.setValue(fieldName, [
                      ...previousValues,
                      {
                        code: item?.id,
                        code_value: item?.item,
                        ...attributes,
                      },
                    ]);
                    if (fieldName2) {
                      form.setValue(fieldName2, [
                        ...previousValues,
                        {
                          code: item?.id,
                          code_value: item?.item,
                          ...attributes,
                        },
                      ]);
                    }
                  }}
                  className={"my-2"}
                />
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default HeAutoCompleteSearch;
