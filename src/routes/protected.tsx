import { BackRoute } from "@/components/Element/BackRoute";
import { Loading } from "@/components/Element/Loading";
import { ContentLayout } from "@/components/Layout";
import { Logout, selectUserEmail } from "@/features/auth";
import { ErrorPage } from "@/features/misc";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const App = () => {
  const userEmail = useSelector(selectUserEmail);

  return (
    <ContentLayout title="Home">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        }
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <h2 className="text-xl font-medium text-gray-700">
            Hi <span className="font-bold text-blue-700">{userEmail}</span>! You
            can only see this if you're logged in!
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Logout />
            <BackRoute link="/" />
          </div>
        </div>

        <Outlet />
      </Suspense>
    </ContentLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
  },
];
