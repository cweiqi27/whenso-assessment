import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-slate-200">
      <h1 className="text-6xl font-black sm:text-9xl">Oops!</h1>
      <p className="text-2xl font-bold">Something went wrong.</p>
      <Link to="/">Back to start page</Link>
    </div>
  );
};
