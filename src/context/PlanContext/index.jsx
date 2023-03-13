import { createContext } from "react";

const PlanContext = createContext({
  plans: {},
  addToPlan: () => { },
  removeFromPlan: () => { },
  setColor: () => { },
  materias: [],
  turmas: {},
  colors: {}
});

export default PlanContext;
