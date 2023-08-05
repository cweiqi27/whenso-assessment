import { Button } from ".";
import type { ButtonProps } from ".";

type PrimaryButtonProps = ButtonProps;

export const PrimaryButton = ({
  type = "button",
  children,
  restProps,
}: PrimaryButtonProps) => {
  return (
    <Button
      className="rounded-lg border-[0.05rem] border-b-4 border-gray-600 bg-sky-300 font-bold text-slate-800 transition hover:border-gray-800 hover:bg-sky-500"
      type={type}
      restProps={{ ...restProps }}
    >
      {children}
    </Button>
  );
};
