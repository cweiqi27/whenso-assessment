import { PrimaryButton } from "@/components/Element/Button";
import { Form, InputField } from "@/components/Form";
import { resetPassword } from "@/lib/firebase";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { z } from "zod";
import type { FormInput } from "..";
import { emailRegex } from "@/utils";
import { Alert, type AlertProps } from "@/components/Element/Alert";
import { authErrorCodes } from "@/lib/firebase";

const schema = z.object({
  email: z.string().email(),
});

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState<FormInput>({ input: "", valid: false });
  const [alertProps, setAlertProps] = useState<
    Omit<Partial<AlertProps>, "className">
  >({
    type: undefined,
    message: undefined,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setEmail({ input: input, valid: !!input.match(emailRegex) });
  };

  const resetPasswordCallback = async () => {
    setLoading(true);

    const { code } = await resetPassword(email.input);

    if (code === authErrorCodes.INVALID_EMAIL) {
      setAlertProps({ type: "error", message: "Email is invalid!" });
    }
    if (code === authErrorCodes.USER_DELETED) {
      setAlertProps({ type: "error", message: "User does not exist" });
    }
    if (code === "success") {
      setAlertProps({
        type: "success",
        message:
          "Email sent successfully! Check your inbox for the next steps.",
      });
    }

    setLoading(false);
  };

  return (
    <Form callback={resetPasswordCallback} schema={schema}>
      <div className="flex flex-col gap-4">
        {!!alertProps.type && !!alertProps.message && (
          <Alert type={alertProps.type} message={alertProps.message} />
        )}

        {/* Email Input */}
        <InputField
          label="Email"
          name="email"
          type="email"
          className="w-full"
          restProps={{
            onChange: (e) => handleUpdateInput(e),
            value: email.input,
          }}
          error={
            email.input.length > 0 && !email.valid
              ? "Email format invalid."
              : undefined
          }
        />

        <PrimaryButton type="submit">
          {loading ? "Loading..." : "Send reset password link"}
        </PrimaryButton>
      </div>
    </Form>
  );
};
