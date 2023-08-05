import { PrimaryButton } from "@/components/Element/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "@/features/auth";
import { ContentLayout } from "@/components/Layout";

export const Landing = () => {
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();

  const handleStart = () => {
    if (userId) {
      navigate("/app");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <ContentLayout title="Start">
      <section className="flex justify-center">
        <PrimaryButton
          restProps={{
            onClick: handleStart,
          }}
        >
          {userId ? "Go to app" : "Log in"}
        </PrimaryButton>
      </section>
    </ContentLayout>
  );
};
