import { useEffect } from "react";
import { useSelector } from "react-redux";

import { HeTextInput } from ".";

import { FormField, FormLabel, FormMessage } from "../components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { isObjectEmpty, getLabels } from "../reduxFolder/CommonFunctions";

const HePhoneNumber = ({
  form,
  labelValue,
  dialCodeField,
  phoneNumField,
  required = true,
}) => {
  const { staticData, appLanguage, labelData } = useSelector(
    (state) => state.authReducer
  );
  const { countryCode } = staticData;

  const watchPhone = form.watch(phoneNumField);
  useEffect(() => {
    let input = watchPhone?.replace(/\D/g, "");
    if (input?.length > 3) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    }
    if (input.length > 7) {
      input = `${input.slice(0, 7)}-${input.slice(7)}`;
    }
    form.setValue(phoneNumField, input);
  }, [watchPhone, form]);

  return (
    <div>
      <FormLabel className="text-slate-500 self-start">
        {labelValue} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <div className="flex justify-between gap-2 w-full -mt-1">
        <div className="w-1/4">
          <FormField
            control={form.control}
            name={dialCodeField}
            defaultValue={"+1"}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue="+1">
                <SelectTrigger className="truncate">
                  <SelectValue
                    placeholder={getLabels(
                      "patOnPhoneCode",
                      appLanguage,
                      labelData
                    )}
                  />
                </SelectTrigger>
                <SelectContent className="max-w-[300px] max-h-[200px] bg-white">
                  {!isObjectEmpty(countryCode)
                    ? countryCode.map((item) => {
                        return (
                          <SelectItem key={item.label} value={item.label}>
                            <span className="font-semibold">{item.value}</span>
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
                <FormMessage />
              </Select>
            )}
          />
        </div>
        <div className="w-3/4">
          <HeTextInput
            form={form}
            fieldName={phoneNumField}
            type={"tel"}
            maxLength={12}
            placeholder={"333-444-5555"}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HePhoneNumber;
