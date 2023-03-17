import { useEffect, useState } from "react";

import PlanContext from "./index";
import AllColors from "../../util/colors";
import planModel from "./planModel";

const PlanProvider = ({ children }) => {
  const [plans, setPlans] = useState({
    plano_1: planModel
  });
  const [currentPlanName, setCurrentPlanName] = useState("plano_1")
  const [hovered, setHovered] = useState([])
  const [combination, setCombination] = useState({})

  const localKey = "MATO_Planos"

  const currentPlan = plans[currentPlanName];

  function setCurrentPlan(newPlan) {
    const oldPlans = { ...plans }
    oldPlans[currentPlanName] = newPlan
    setPlans(oldPlans)
  }

  useEffect(() => {
    const localPlans = localStorage.getItem(localKey);
    if (localPlans) {
      const p = JSON.parse(localPlans)
      setPlans(p);
      setCurrentPlanName(Object.keys(p)[0])
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(localKey, JSON.stringify(plans));
    }, 400);
    return () => clearTimeout(timer)
  }, [plans])



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



  function changeName(oldName, newName) {
    if (!oldName || oldName == "" || !newName || newName == "") {
      return (false);
    }
    const oldPlans = { ...plans }
    const oldNamed = oldPlans[oldName]
    delete oldPlans[oldName];
    oldPlans[newName] = oldNamed;


    setPlans(oldPlans)
    setCurrentPlanName(newName)
  }


  function createPlan() {
    function verifyName(n) {
      let x = 1;
      while (plans[`plano_${x}`]) {
        x++
      }
      return (`plano_${x}`)
    }
    const newPlans = { ...plans }
    newPlans[verifyName(1)] = planModel
    setPlans(newPlans)
  }

  function deletePlan(planName) {
    const oldPlans = { ...plans }
    delete oldPlans[planName];
    setPlans(oldPlans)

    if (Object.keys(oldPlans).length == 0) {
      oldPlans['plano_1'] = planModel
    }

    if (currentPlanName == planName) {
      setCurrentPlanName(Object.keys(oldPlans)[0])
    }
  }

  return (
    <PlanContext.Provider
      value={{
        addToPlan,
        removeFromPlan,
        plans,
        currentPlan,
        currentPlanName,
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
        configLabels,
        changeName,
        changePlan: setCurrentPlanName,
        createPlan,
        deletePlan
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export default PlanProvider