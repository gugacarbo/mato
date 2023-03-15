import { useEffect, useState } from "react";

import PlanContext from "./index";
import AllColors from "../../util/colors";
import planModel from "./planModel";

export default ({ children }) => {
  const [plans, setPlans] = useState(planModel);
  /**
    const model = {
    plano_1: {
      materias: [],
      colors: {},
      turmas: {
        "MTM3110": "01002"
      },
    }
  }
   */
  const [currentPlanName, setCurrentPlanName] = useState("plano_1")
  const [currentPlan, setCurrentPlan] = useState(plans[currentPlanName])
  const [hovered, setHovered] = useState([])

  function addToPlan(materia) {
    if (currentPlan.materias.indexOf(materia) == -1) {
      const newMaterias = [...currentPlan.materias, materia];
      const newPlan = { ...currentPlan, materias: newMaterias };

      if (!currentPlan.colors[materia[0]]) {
        currentPlan.colors[materia[0]] = Object.keys(AllColors)[parseInt(Math.random() * Object.keys(AllColors).length)];
      }

      if (!currentPlan.turmas[materia[0]]) {
        currentPlan.turmas[materia[0]] = materia[3][0];
      }

      setCurrentPlan(newPlan);
    } else {
      removeFromPlan(materia);
    }
  }

  function removeFromPlan(materia) {
    if (currentPlan.materias.indexOf(materia) != -1) {
      const newMaterias = [...currentPlan.materias];
      newMaterias.splice(currentPlan.materias.indexOf(materia), 1);
      const newPlan = { ...currentPlan, materias: newMaterias };
      setCurrentPlan(newPlan);
    }
  }

  function setColor(materia, color) {
    const newColors = { ...currentPlan.colors };
    newColors[materia[0]] = color;
    const newPlan = { ...currentPlan, colors: newColors };
    setCurrentPlan(newPlan);
  }

  function setTurma(materia, turma) {
    const newTurmas = { ...currentPlan.turmas };
    if (newTurmas[materia[0]] == turma) {
      newTurmas[materia[0]] = undefined;
    } else {
      newTurmas[materia[0]] = turma;
    }
    const newPlan = { ...currentPlan, turmas: newTurmas };
    setCurrentPlan(newPlan);
  }

  function handleSetHovered(mat = null, tur = null) {
    if (mat == null) {
      setHovered({})
    } else {
      setHovered(prev => {
        let p = { ...prev }
        p[mat] = tur;
        return (p)
      })
    }
  }

  function setCombination(combination) {
    const newPlan = { ...currentPlan, turmas: combination };
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
        setTurma,
        materias: currentPlan?.materias ?? [],
        colors: currentPlan?.colors ?? {},
        turmas: currentPlan?.turmas ?? {},
        hovered,
        setHovered: handleSetHovered,
        setCombination
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
