import { RegisterForm } from "../components";
import { ContentLayout } from "@/components/Layout";
import { AuthLayout } from "../layout";

export const Register = () => {
  return (
    <>
      <ContentLayout title="Sign Up">
        <AuthLayout type="register">
          <RegisterForm />
        </AuthLayout>
      </ContentLayout>
    </>
  );
};
