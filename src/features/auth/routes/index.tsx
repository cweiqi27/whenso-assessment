import { Route, Routes } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
};
