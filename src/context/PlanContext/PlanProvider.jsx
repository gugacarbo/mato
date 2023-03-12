import { useEffect, useState } from "react";

import PlanContext from "./index";

export default ({ children }) => {

  const [plans, setPlans] = useState({
    plano_1: {
      materias: [],
      colors: {},
    }
  });

  const [currentPlanName, setCurrentPlanName] = useState("plano_1")

  const [currentPlan, setCurrentPlan] = useState(plans[currentPlanName])


  function addToPlan(item) {
    if (currentPlan.materias.indexOf(item) == -1) {
      const newMaterias = [...currentPlan.materias, item];
      const newPlan = { ...currentPlan, materias: newMaterias };
      setCurrentPlan(newPlan);
    } else {
      removeFromPlan(item);
    }
  }
  function removeFromPlan(item) {
    if (currentPlan.materias.indexOf(item) != -1) {
      const newMaterias = [...currentPlan.materias];
      newMaterias.splice(currentPlan.materias.indexOf(item), 1);
      const newPlan = { ...currentPlan, materias: newMaterias };
      setCurrentPlan(newPlan);
    }
  }

  function setColor(item, color) {
    const newColors = { ...currentPlan.colors };
    newColors[item[0]] = color;
    const newPlan = { ...currentPlan, colors: newColors };
    setCurrentPlan(newPlan);
  }


  return (
    <PlanContext.Provider
      value={{
        addToPlan,
        removeFromPlan,
        plans,
        currentPlan,
        setColor,
        materias: currentPlan?.materias ?? [],
        colors: currentPlan?.colors ?? {}
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
