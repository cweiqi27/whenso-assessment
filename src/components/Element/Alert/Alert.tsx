import { cn } from "@/utils";

export type AlertProps = {
  type: "success" | "error" | "warning" | "info";
  message: string;
  className?: string;
};

export const Alert = ({ type, message, className }: AlertProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border-[0.05rem] border-b-4 bg-slate-50 p-4",
        className,
        {
          "border-green-500 text-green-500": type === "success",
          "border-red-500 text-red-500": type === "error",
          "border-yellow-500 text-yellow-500": type === "warning",
          "border-blue-500 text-blue-500": type === "info",
        },
      )}
    >
      <span className="font-semibold uppercase">{type}!</span>
      <p>{message} </p>
    </div>
  );
};
