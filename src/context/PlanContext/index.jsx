import { createContext } from "react";
import planModel from './planModel'
const PlanContext = createContext({
  plans: {},
  currentPlanName: "",
  changeCurrentName: () => { },
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
  changeName: () => { },
  createPlan: () => { },
  deletePlan: () => { },
  changePlan: () => { },
  config: {},
  configLabels: {},

});

export default PlanContext;
