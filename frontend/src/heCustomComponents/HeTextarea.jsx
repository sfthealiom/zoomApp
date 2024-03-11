import { Textarea } from "../components/ui/Textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form";

const HeTextarea = ({
  form,
  labelName,
  fieldName,
  placeholder,
  required,
  className,
  innerTextClass,
  disabledStatus,
}) => {
  return (
    <FormField
      control={form?.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`w-full ${className}`}>
          {labelName && (
            <FormLabel className="text-slate-500">
              {labelName} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              disabled={disabledStatus}
              placeholder={placeholder}
              className={`${innerTextClass}`}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeTextarea;
