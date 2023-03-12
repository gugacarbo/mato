import DataProvider from "./DataContext/DataProvider";
import PlanProvider from "./PlanContext/PlanProvider";
import StyleProvider from "./StyleContext/StyleProvider";

function AppContextProvider({ children }) {
  return (
    <StyleProvider>
      <DataProvider>
        <PlanProvider>
          {children}
        </PlanProvider>
      </DataProvider>
    </StyleProvider>
  );
}

export default AppContextProvider;
