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
}) => {
  return (
    <FormField
      control={form.control}
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
              placeholder={placeholder}
              className={`resize-none ${innerTextClass}`}
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
