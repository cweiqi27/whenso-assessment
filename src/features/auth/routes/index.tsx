import { Route, Routes } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";
import { ErrorPage } from "@/features/misc";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
