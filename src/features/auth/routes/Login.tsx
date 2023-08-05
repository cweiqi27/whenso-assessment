import { LoginForm } from "../components";
import { ContentLayout } from "@/components/Layout";
import { AuthLayout } from "../layout";

export const Login = () => {
  return (
    <ContentLayout title="Login">
      <AuthLayout type="login">
        <LoginForm />
      </AuthLayout>
    </ContentLayout>
  );
};
