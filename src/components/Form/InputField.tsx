import React from "react";
import { cn } from "@/utils";
import { FieldWrapper } from "./FieldWrapper";
import type { FieldWrapperPassThroughProps } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "email" | "password" | "text";
  name: string;
  className?: string;
  restProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className" | "name" | "type"
  >;
};

export const InputField = ({
  type = "text",
  name,
  className,
  restProps,
  label,
  error,
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        className={cn(
          "rounded border-2 border-slate-500 p-2 outline-slate-700 disabled:cursor-not-allowed disabled:border-slate-300",
          className,
          {
            "outline-red-500": !!error,
          },
        )}
        type={type}
        name={name}
        {...restProps}
      />
    </FieldWrapper>
  );
};
