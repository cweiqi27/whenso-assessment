import { Link } from "react-router-dom";

type BackRouteProps = {
  link: string;
};

export const BackRoute = ({ link }: BackRouteProps) => {
  return (
    <>
      <Link to={link}>
        <div className="rounded-full border-[0.05rem] border-b-4 border-gray-300 px-4 py-2 text-center font-bold text-gray-600 transition hover:bg-gray-200">
          Go back
        </div>
      </Link>
    </>
  );
};
