import AppContextProvider from "./context/AppContextProvider";
import Root from "./pages/Root";
function App() {
  return (
    <AppContextProvider>
      <Root />
    </AppContextProvider>
  );
}

export default App;
