import { selectUserId } from "@/features/auth";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Landing } from "@/features/misc";

export const AppRoutes = () => {
  const authUser = useSelector(selectUserId);

  const commonRoutes = [
    {
      path: "/",
      element: <Landing />,
    },
  ];

  const routes = authUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
