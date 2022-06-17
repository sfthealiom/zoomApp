import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "../../components/lib/utils";
import { companyMetaData } from "../../assets/myCompanyData";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex items-center justify-center peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current rounded-sm h-4 w-4"
      )}
      style={{ backgroundColor: companyMetaData?.secondary }}
    >
      <Check
        className="h-4 w-4"
        style={{ color: companyMetaData?.accentWhite }}
      />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
