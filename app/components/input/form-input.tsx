import {
  LabeledInput,
  LabeledInputProps,
} from "@components/input/labeled-input";
import { forwardRef, ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  error?: string;
} & LabeledInputProps;

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ icon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {icon}
          <LabeledInput ref={ref} className="w-full" {...props} />
        </div>
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
