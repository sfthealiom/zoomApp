import React, { useState } from "react";

import unitedStates from "../assets/images/flags/united-states.png";
import france from "../assets/images/flags/france.png";
import spain from "../assets/images/flags/spain.png";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

import { useDispatch, useSelector } from "react-redux";
import { setAppLang } from "../reduxFolder/actions/AuthActions";

const HeLanguageSelector = () => {
  const dispatch = useDispatch();
  const { appLanguage } = useSelector((state) => state.authReducer);

  return (
    <div className="flex items-center gap-2 px-2 md:px-4 py-2 select-none">
      <h1 className="text-sm text-slate-500">Your language: </h1>
      <Select
        defaultValue={appLanguage}
        className="select-none"
        onValueChange={(val) => {
          dispatch(setAppLang(val));
        }}
      >
        <SelectTrigger className="border-none w-[60px]">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value="en">
              <div className="flex items-center gap-2">
                <img
                  className="h-4 w-4"
                  src={unitedStates}
                  alt="united-states-flag.png"
                />
                <span className="font-semibold">EN</span>
              </div>
            </SelectItem>
            <SelectItem value="es">
              <div className="flex items-center gap-2">
                <img
                  className="h-4 w-4"
                  src={spain}
                  alt="united-states-flag.png"
                />
                <span className="font-semibold">ES</span>
              </div>
            </SelectItem>
            <SelectItem value="fr">
              <div className="flex items-center gap-2">
                <img
                  className="h-4 w-4"
                  src={france}
                  alt="united-states-flag.png"
                />
                <span className="font-semibold">FR</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default HeLanguageSelector;
