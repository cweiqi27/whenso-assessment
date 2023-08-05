import { ContentLayout } from "@/components/Layout";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { BackRoute } from "@/components/Element/BackRoute";

export const ResetPassword = () => {
  return (
    <ContentLayout title="Reset Password">
      <section className="flex flex-col gap-4">
        <ResetPasswordForm />
        <BackRoute link="/auth/login" />
      </section>
    </ContentLayout>
  );
};
