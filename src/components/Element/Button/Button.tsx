import { cn } from "@/utils";
import React from "react";

export type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  restProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;
};

export const Button = ({
  className,
  type = "button",
  children,
  restProps,
}: ButtonProps) => {
  return (
    <button
      className={cn("rounded px-4 py-2", className)}
      type={type}
      {...restProps}
    >
      {children}
    </button>
  );
};
