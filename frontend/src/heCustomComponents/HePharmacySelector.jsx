import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/components copy/lib/utils";
import { Input } from "@/components copy/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components copy/ui/Select";
import { companyMetaData } from "@/assets/myCompanyData";

import { useDispatch, useSelector } from "react-redux";
import {
  getPharamcyList,
  setPharmacyListEmpty,
} from "@/reduxFolder/actions/NewPatientActions";

const HePharmacySelector = ({ setSelectedPharmacy, className }) => {
  const dispatch = useDispatch();
  const { currentUserData } = useSelector((state) => state.authReducer);
  const { pharmacyList } = useSelector((state) => state.newPatientReducer);

  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    dispatch(getPharamcyList(filter, search, currentUserData, jwtToken));
  }, [search]);

  useEffect(() => {
    if (pharmacyList?.length > 0) {
      setShowDropDown(true);
    }
  }, [pharmacyList]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={cn(
          "w-full flex items-center gap-2 border border-slate-300 rounded-md bg-slate-100 p-4",
          {
            "rounded-t-md": showDropDown,
          }
        )}
      >
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-1/3 h-10 border border-slate-300 px-2 rounded-md font-semibold select-none">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="font-semibold select-none">
            <SelectGroup>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="zip_code">Zip Code</SelectItem>
              <SelectItem value="city">City</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div
          className={cn(
            "w-2/3 flex h-10 bg-white items-center justify-between border border-slate-300 rounded-md px-4 py-2",
            {
              "cursor-not-allowed": !filter,
            }
          )}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          <Input
            className="border-none"
            value={search}
            placeholder={`Search by ${filter}`}
            disabled={!filter}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search?.length >= 2 && (
            <FontAwesomeIcon
              icon={faXmark}
              className="h-4 w-4 rounded-md p-1 cursor-pointer text-white"
              style={{ backgroundColor: companyMetaData?.accentOne }}
              onClick={() => {
                setSearch("");
                setShowDropDown(false);
              }}
            />
          )}
        </div>
      </div>
      {showDropDown && search?.length >= 2 && (
        <div className="w-full min-h-[18rem] max-h-[24rem] overflow-scroll border border-slate-300 bg-white rounded-b-md shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {pharmacyList?.map((item) => {
            return (
              <div
                key={item?.pharmacy_id}
                className="p-3 flex flex-col items-start m-3 rounded-md cursor-pointer"
                style={{ backgroundColor: companyMetaData?.accentOneLight }}
                onClick={() => {
                  setSelectedPharmacy(item);
                  setShowDropDown(false);
                }}
              >
                <h1 className="font-semibold text-base">
                  {item?.pharmacy_name}
                </h1>
                <h2 className="text-slate-400 text-sm">
                  {item?.pharmacy_address1}, {item?.pharmacy_city},{" "}
                  {item?.pharmacy_state}, {item?.pharmacy_zip_code}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HePharmacySelector;
