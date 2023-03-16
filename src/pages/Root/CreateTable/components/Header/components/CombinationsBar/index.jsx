import styled from "styled-components";
import createCombinations from "../../../../../../../util/createCombinations";
import { useState, useEffect, useContext } from 'react'
import PlanContext from "../../../../../../../context/PlanContext";
import { ReactComponent as GearSvg } from "../../../../../../../assets/gear.svg";
import Config from "./Config";

function CombinationsBar() {
  const { materias, setCombination, config } = useContext(PlanContext)
  const [combinations, setCombinations] = useState({})
  const [currentComb, setCurrentComb] = useState(0)

  const [openConfig, setOpenConfig] = useState(false)


  useEffect(() => {
    setCombinations(createCombinations(materias, config))
  }, [materias, config])

  useEffect(() => {
    setCurrentComb(0);
  }, [combinations])

  useEffect(() => {
    currentComb != 0 && setCombination(combinations[Object.keys(combinations)[currentComb - 1]] ?? []);
  }, [currentComb])


  return (
    <CombinationsBox openConfig={openConfig}>
      Combinações
      <button
        onClick={() => {
          setCurrentComb(prev => prev - 1 >= 1 ? prev - 1 : Object.keys(combinations).length ?? 0)
        }}
      >-</button>
      {currentComb}/{Object.keys(combinations).length}
      <button
        onClick={() => {
          setCurrentComb(prev => prev + 1 <= Object.keys(combinations).length ? prev + 1 : 0)
        }}
      >+  </button>
      <GearSvg onClick={() => setOpenConfig(prev => !prev)} />
      <Config openConfig={openConfig} setOpenConfig={setOpenConfig} />
    </CombinationsBox>);
}

export default CombinationsBar;


const CombinationsBox = styled.div`
  grid-area: combinations;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  position: relative;
  gap: 1rem;
  width: 100%;
  button{
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
    color: ${({ theme }) => theme.color.white};
    font-size: 1rem;
  }
  svg{
    width: 1.3rem;
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.x3};
    cursor: pointer;
    transform: rotateZ(${({ openConfig }) => openConfig ? '90deg' : ' 0deg'});
    &:hover{
      transform: rotateZ(${({ openConfig }) => openConfig ? '90deg' : '-25deg'});
      fill: ${({ theme }) => theme.color.main.lighter};
    }
  }
`