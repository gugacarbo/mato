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
  const [combination, setCombination] = useState({})
  const [config, setConfig] = useState({
    agrupar: true,
    ignorarConflito: false,
    ignorarCheias: true,
    // ignorarCanceladas: true,
  })

  const configLabels = {
    agrupar: 'Agrupar Horários Iguais',
    ignorarConflito: 'Ignorar Conflitos de Horários',
    ignorarCheias: "Ignorar Turmas Cheias",
    // ignorarCanceladas: true,
  }

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
  function handleSetCombination(newCombination) {
    const newPlan = { ...currentPlan, turmas: newCombination };
    setCurrentPlan(newPlan);
    setCombination(newCombination)
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
        setCombination: handleSetCombination,
        combination,
        disableClose: false,
        config,
        setConfig,
        configLabels
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};
