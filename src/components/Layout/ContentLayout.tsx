import { Head } from "../Head";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col justify-center bg-slate-200 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-2 bg-yellow-300 px-6 py-4 sm:mx-0 sm:rounded-t-xl">
            <h1 className="mt-3 text-center text-3xl font-extrabold text-gray-800">
              {title}
            </h1>
          </div>
          <main className="mx-2 border-b-4 border-gray-400 bg-slate-50 px-4 py-8 sm:mx-0 sm:rounded-b-xl sm:px-10">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
