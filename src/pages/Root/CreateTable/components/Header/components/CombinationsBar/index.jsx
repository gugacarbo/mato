import styled from "styled-components";
import createCombinations from "../../../../../../../util/createCombinations";
import { useState, useEffect, useContext } from 'react'
import PlanContext from "../../../../../../../context/PlanContext";

function CombinationsBar() {
  const { materias, setCombination } = useContext(PlanContext)
  const [combinations, setCombinations] = useState({})

  const [currentComb, setCurrentComb] = useState(1)

  useEffect(() => {
    setCombinations(createCombinations(materias))
  }, [materias])

  useEffect(() => {
    setCurrentComb(1);
  }, [combinations])

  useEffect(() => {
    setCombination(combinations[Object.keys(combinations)[currentComb-1]] ?? []);
  }, [currentComb])


  return (
    <CombinationsBox>
      <button
        onClick={() => {
          setCurrentComb(prev => prev - 1 >= 1 ? prev - 1 : Object.keys(combinations).length)
        }}
      >-</button>
      {currentComb}/{Object.keys(combinations).length}
      <button
        onClick={() => {
          setCurrentComb(prev => prev + 1 <= Object.keys(combinations).length ? prev + 1 : 1)
        }}
      >+  </button>
    </CombinationsBox>);
}

export default CombinationsBar;


const CombinationsBox = styled.div`
  grid-area: combinations;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`