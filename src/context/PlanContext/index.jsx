import { createContext } from "react";
import planModel from './planModel'
const PlanContext = createContext({
  plans: {},
  currentPlan: planModel,
  setCurrentPlan: () => { },
  addToPlan: () => { },
  removeFromPlan: () => { },
  setColor: () => { },
  materias: [],
  turmas: {},
  colors: {},
  setTurma: () => { },
  setHovered: () => { },
  setCombination: () => { },
});

export default PlanContext;
