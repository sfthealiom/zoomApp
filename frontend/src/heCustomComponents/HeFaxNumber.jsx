import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components copy/ui/Form";
import { Input } from "@/components copy/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components copy/ui/Select";
import { isObjectEmpty, getLabels } from "@/reduxFolder/CommonFunctions";

const HePhoneNumber = ({
  form,
  labelValue,
  faxAreaCodeField,
  faxCountryCodeField,
  faxLocalNoField,
  required = true,
}) => {
  const { staticData, appLanguage, labelData } = useSelector(
    (state) => state.authReducer
  );
  const { countryCode } = staticData;

  const watchFaxLocalNo = form.watch(faxLocalNoField);
  useEffect(() => {
    let input = watchFaxLocalNo?.replace(/\D/g, "");
    if (input?.length > 3) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    }
    if (input.length > 8) {
      input = `${input.slice(0, 8)}-${input.slice(8)}`;
    }
    form.setValue(faxLocalNoField, input);
  }, [watchFaxLocalNo, form]);

  return (
    <div>
      <FormLabel className="text-slate-500 self-start">
        {labelValue} {required && <span className="text-red-500">*</span>}
      </FormLabel>
      <div className="flex justify-between gap-2 w-full -mt-1">
        <div className="w-1/4">
          <FormField
            control={form.control}
            name={faxCountryCodeField}
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
                <SelectContent className="max-w-[300px] max-h-[200px]">
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
        <div className="w-1/4">
          <FormField
            control={form.control}
            name={faxAreaCodeField}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    maxLength={3}
                    className="font-semibold"
                    placeholder="333"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-1/2">
          <FormField
            control={form.control}
            name={faxLocalNoField}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    maxLength={8}
                    className="font-semibold"
                    placeholder="444-5555"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default HePhoneNumber;
