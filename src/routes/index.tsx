import { selectUserId } from "@/features/auth";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { ErrorPage, Landing } from "@/features/misc";

export const AppRouter = () => {
  const authUser = useSelector(selectUserId);

  const commonRoutes = [
    {
      path: "/",
      element: <Landing />,
      errorElement: <ErrorPage />,
    },
  ];

  const routes = authUser ? protectedRoutes : publicRoutes;

  const router = createBrowserRouter([...routes, ...commonRoutes]);

  return <RouterProvider router={router} />;
};
