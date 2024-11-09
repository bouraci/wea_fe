import { forwardRef, InputHTMLAttributes, ReactElement } from "react";

type Props = {
  icon?: ReactElement;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ icon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {icon}
          <input ref={ref} className="w-full" {...props} />
        </div>
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
