import AppContextProvider from "./context/AppContextProvider";
import RouterProvider from "./Router";

function App() {
  return (
    <AppContextProvider>
      <RouterProvider />
    </AppContextProvider>
  );
}

export default App;
