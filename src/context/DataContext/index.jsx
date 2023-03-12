import { createContext } from "react";

const DataContext = createContext({
  map: {},
  campus: {},
  setCampus: () => { },
  currentCampusData: []
});

export default DataContext;
