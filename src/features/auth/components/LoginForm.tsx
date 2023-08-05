import { emailRegex } from "@/utils";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FormInput, ParsedFormData } from "@/components/Form/types";
import { z } from "zod";
import { authErrorCodes, login } from "@/lib/firebase";
import { Form, InputField } from "@/components/Form/";
import { PrimaryButton } from "@/components/Element/Button";
import { useDispatch } from "react-redux";
import { setActive } from "..";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/components/Element/Alert";
import type { AlertProps } from "@/components/Element/Alert";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export const LoginForm = () => {
  const [email, setEmail] = useState<FormInput>({ input: "", valid: false });
  const [password, setPassword] = useState<FormInput>({
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

  /**
   * Handler that updates input on change.
   */
  const handleUpdateInput = (
    event: ChangeEvent<HTMLInputElement>,
    inputType: "email" | "password",
  ) => {
    const input = event.target.value;

    if (inputType === "email") {
      setEmail({ input: input, valid: !!input.match(emailRegex) });
    } else {
      setPassword({ input: input, valid: input.length >= 7 });
    }
  };

  /**
   * Callback that should be fired if zod validation for form succeed.
   */
  const loginCallback = async (validatedForm: ParsedFormData) => {
    setLoading(true);

    const { code, user } = await login(
      validatedForm.email,
      validatedForm.password,
    );
    if (code === authErrorCodes.USER_DELETED) {
      setPassword({ ...password, input: "" });
      setAlertProps({ type: "error", message: "User does not exist." });
    }
    if (code === authErrorCodes.INVALID_PASSWORD) {
      setPassword({ ...password, input: "" });
      setAlertProps({ type: "error", message: "Wrong password." });
    }
    if (user) {
      dispatch(
        setActive({
          id: user.uid,
          email: user.email,
        }),
      );
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <>
      <Form schema={schema} callback={loginCallback}>
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

          <PrimaryButton type="submit">
            {loading ? "Loading..." : "Login"}
          </PrimaryButton>
        </div>
      </Form>
    </>
  );
};
