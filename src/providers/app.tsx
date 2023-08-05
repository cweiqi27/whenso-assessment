import { Button } from "@/components/Element/Button";
import { persistor, store } from "@/stores";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "@/components/Element/Loading";
import { PersistGate } from "redux-persist/integration/react";

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Houston, we have a problem!</h2>
      <Button
        className="mt-4"
        restProps={{
          onClick: () => window.location.assign(window.location.origin),
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <Loading />
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HelmetProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </HelmetProvider>
          </ErrorBoundary>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
};
