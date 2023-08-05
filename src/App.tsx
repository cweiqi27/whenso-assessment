import { AppProvider } from "./providers/app";
import { AppRouter } from "./routes";

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
