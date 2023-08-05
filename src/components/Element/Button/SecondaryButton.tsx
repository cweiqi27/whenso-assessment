import { Button } from ".";
import type { ButtonProps } from ".";

type SecondaryButtonProps = ButtonProps;

export const SecondaryButton = ({
  type = "button",
  children,
  restProps,
}: SecondaryButtonProps) => {
  return (
    <Button
      className="rounded-lg border-[0.05rem] border-b-4 border-slate-700 bg-yellow-400 font-bold text-slate-700 transition hover:bg-yellow-600"
      type={type}
      restProps={{ ...restProps }}
    >
      {children}
    </Button>
  );
};
