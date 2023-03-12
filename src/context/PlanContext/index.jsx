import { createContext } from "react";

const PlanContext = createContext({
  plans: {},
  addToPlan: () => { },
  removeFromPlan: () => { },
  setColor: () => { },
  materias: [],
  colors: []
});

export default PlanContext;
