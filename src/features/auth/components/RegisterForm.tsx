import { emailRegex } from "@/utils";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormInput } from "../types";
import type { ParsedFormData } from "@/components/Form/types";
import { create, authErrorCodes } from "@/lib/firebase";
import { z } from "zod";
import { Form, InputField } from "@/components/Form/";
import { PrimaryButton } from "@/components/Element/Button";
import { Alert, type AlertProps } from "@/components/Element/Alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActive } from "..";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(7),
    confirmPassword: z.string().min(7),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export const RegisterForm = () => {
  const [email, setEmail] = useState<FormInput>({ input: "", valid: false });
  const [password, setPassword] = useState<FormInput>({
    input: "",
    valid: false,
  });
  const [confirmPassword, setConfirmPassword] = useState<FormInput>({
    input: "",
    valid: false,
  });
  const [loading, setLoading] = useState(false);
  const [alertProps, setAlertProps] = useState<
    Omit<Partial<AlertProps>, "className">
  >({
    type: undefined,
    message: undefined,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateInput = (
    event: ChangeEvent<HTMLInputElement>,
    inputType: "email" | "password" | "confirmPassword",
  ) => {
    const input = event.target.value;

    if (inputType === "email") {
      setEmail({ input: input, valid: !!input.match(emailRegex) });
    } else if (inputType === "password") {
      setPassword({ input: input, valid: input.length >= 7 });
      setConfirmPassword({
        ...confirmPassword,
        valid: input === confirmPassword.input,
      });
    } else {
      setConfirmPassword({ input: input, valid: input === password.input });
    }
  };

  /**
   * Callback that should be fired if zod validation for form succeed.
   */
  const registerCallback = async (validatedForm: ParsedFormData) => {
    setLoading(true);

    const { code, user } = await create(
      validatedForm.email,
      validatedForm.password,
    ).finally(() => setLoading(false));

    if (code === authErrorCodes.EMAIL_EXISTS) {
      setEmail({ ...email, input: "" });
      setPassword({ ...password, input: "" });
      setConfirmPassword({ ...confirmPassword, input: "" });
      setAlertProps({
        type: "error",
        message: "This email is already in use!",
      });
    }
    if (user) {
      dispatch(
        setActive({
          email: user.email,
          id: user.uid,
        }),
      );
      navigate("/app");
    }
  };

  return (
    <>
      <Form schema={schema} callback={registerCallback}>
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
              onChange: (e) => handleUpdateInput(e, "email"),
              value: email.input,
            }}
            error={
              email.input.length > 0 && !email.valid
                ? "Email format invalid."
                : undefined
            }
          />

          {/* Password Input */}
          <InputField
            label="Password"
            name="password"
            type="password"
            className="w-full"
            restProps={{
              onChange: (e) => handleUpdateInput(e, "password"),
              value: password.input,
            }}
            error={
              password.input.length > 0 && !password.valid
                ? "Password must be over 6 characters."
                : undefined
            }
          />

          {/* Confirm Password Input */}
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            className="w-full"
            restProps={{
              onChange: (e) => handleUpdateInput(e, "confirmPassword"),
              value: confirmPassword.input,
              disabled: !password.input,
            }}
            error={
              password.input.length > 0 &&
              confirmPassword.input.length > 0 &&
              !confirmPassword.valid
                ? "Passwords don't match."
                : undefined
            }
          />

          <PrimaryButton type="submit">
            {loading ? "Loading..." : "Sign Up"}
          </PrimaryButton>
        </div>
      </Form>
    </>
  );
};
