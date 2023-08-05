import { Link } from "react-router-dom";
import { BackRoute } from "@/components/Element/BackRoute";

type AuthLayoutProps = {
  children: React.ReactNode;
  type: "login" | "register";
};

export const AuthLayout = ({ children, type }: AuthLayoutProps) => {
  return (
    <section className="flex w-full flex-col gap-8">
      {children}
      <div className="inline-flex items-center gap-1 ">
        <p className="cursor-default text-gray-700">
          {type === "register"
            ? "Already got an account?"
            : "Don't have an account?"}
        </p>
        <span className="font-semibold text-gray-800 decoration-yellow-500 decoration-2 transition hover:text-gray-600 hover:underline">
          {type === "register" ? (
            <Link to="/auth/login">Login</Link>
          ) : (
            <Link to="/auth/register">Sign up</Link>
          )}
        </span>
      </div>

      {type === "login" && (
        <div className="flex">
          <p className="text-sm text-gray-700 decoration-yellow-500 decoration-2 transition hover:text-gray-900 hover:underline">
            <Link to="/auth/reset-password">Oops! I forgot my password.</Link>
          </p>
        </div>
      )}
      <BackRoute link="/" />
    </section>
  );
};
