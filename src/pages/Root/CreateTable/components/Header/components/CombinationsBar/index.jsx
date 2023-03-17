import styled from "styled-components";
import createCombinations from "../../../../../../../util/createCombinations";
import { useState, useEffect, useContext } from 'react'
import PlanContext from "../../../../../../../context/PlanContext";
import { ReactComponent as GearSvg } from "../../../../../../../assets/gear.svg";
import Config from "./Config";
import { ReactComponent as ArrowSvg } from "../../../../../../../assets/arrow_up.svg";


function CombinationsBar() {
  const { materias, setCombination, config } = useContext(PlanContext)
  const [combinations, setCombinations] = useState({})
  const [currentComb, setCurrentComb] = useState(0)

  const [openConfig, setOpenConfig] = useState(false)


  useEffect(() => {
    setCombinations(createCombinations(materias, config))
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [materias, config])

  useEffect(() => {
    setCurrentComb(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [combinations])

  useEffect(() => {
    currentComb != 0 && setCombination(combinations[Object.keys(combinations)[currentComb - 1]] ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [currentComb])


  return (
    <CombinationsBox openConfig={openConfig}>
      Combinações
      <Button
        onClick={() => {
          setCurrentComb(prev => prev - 1 >= 1 ? prev - 1 : Object.keys(combinations).length ?? 0)
        }}
      ><ArrowSvg /></Button>
      {currentComb}/{Object.keys(combinations).length}
      <Button
        right
        onClick={() => {
          setCurrentComb(prev => prev + 1 <= Object.keys(combinations).length ? prev + 1 : Object.keys(combinations).length ? 1 : 0)
        }}
      ><ArrowSvg /></Button>
      <GearOpen onClick={() => setOpenConfig(prev => !prev)} />
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

`

const GearOpen = styled(GearSvg)`
      width: 1.3rem;
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.x3};
    cursor: pointer;
    transform: rotateZ(${({ openConfig }) => openConfig ? '90deg' : ' 0deg'});
    &:hover{
      transform: rotateZ(${({ openConfig }) => openConfig ? '90deg' : '-25deg'});
      fill: ${({ theme }) => theme.color.main.lighter};
    }
`

const Button = styled.button`
      width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.darkGray};
    border: 1px solid ${({ theme }) => theme.color.gray};
    font-size: 1rem;
    outline: none;
  border-radius: 0.2rem;
  transition: ${({ theme }) => theme.transition.main};
  cursor: pointer;
    svg{
      transition: ${({ theme }) => theme.transition.main};
        width: 0.8rem;
       transform: ${({ right }) => right ? `rotate(90deg)` : `rotate(-90deg)`};
      fill: ${({ theme }) => theme.color.white};
      }
      &:hover{
        svg{
          fill: ${({ theme }) => theme.color.main.lighter};
          }
      }
    `