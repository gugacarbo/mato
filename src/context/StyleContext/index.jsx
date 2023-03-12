import { createContext } from "react";

const StyleContext = createContext({
  theme: {},
  setTheme: () => {},
});

export default StyleContext;
