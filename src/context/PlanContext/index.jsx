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
  combination: {},
  setTurma: () => { },
  setHovered: () => { },
  setCombination: () => { },
  disableClose: true,
  setConfig: () => { },
  config: {},
  configLabels: {},

});

export default PlanContext;
