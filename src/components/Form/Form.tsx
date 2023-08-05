import type { ZodSchema } from "zod";
import type { ParsedFormData } from "./types";
import type { FormEvent } from "react";

type FormProps = {
  schema: ZodSchema;
  callback: (parsedData: ParsedFormData) => void;
  children: React.ReactNode;
  className?: string;
};

export const Form = ({ schema, callback, children, className }: FormProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    try {
      const validatedForm = schema.parse(data) as ParsedFormData;
      callback(validatedForm);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
