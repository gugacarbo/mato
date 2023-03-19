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

  const combCount = Object.keys(combinations).length

  return (
    <CombinationsBox openConfig={openConfig} empty={combCount == 0}>
      Combinações
      <Button
        onClick={() => {
          setCurrentComb(prev => prev - 1 >= 1 ? prev - 1 : combCount ?? 0)
        }}
      ><ArrowSvg /></Button>
      {currentComb}/{combCount}
      <Button
        right
        onClick={() => {
          setCurrentComb(prev => prev + 1 <= combCount ? prev + 1 : combCount ? 1 : 0)
        }}
      ><ArrowSvg /></Button>
      <GearOpen openConfig={openConfig} onClick={() => setOpenConfig(prev => !prev)} />
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
    cursor: ${({ empty }) => empty ? `not-allowed` : `pointer`};
  }
`

const GearOpen = styled(GearSvg)`
      width: 1.3rem;
    fill: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition.x2};
    cursor: pointer;
    transform: rotateZ(${({ openConfig }) => openConfig ? '120deg' : ' 0deg'});
    &:hover{
      transform: rotateZ(${({ openConfig }) => openConfig ? '100deg' : '20deg'});
      fill: ${({ theme }) => theme.color.main.lighter};
    }
`

const Button = styled.button`
     width: 1.8rem;
    height: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.text};
    border: none;
    font-size: 1rem;
    outline: none;
  border-radius: 0.2rem;
  transition: ${({ theme }) => theme.transition.main};
  cursor: pointer;
    svg{
      transition: ${({ theme }) => theme.transition.main};
        height: 60%;
       transform: ${({ right }) => right ? `rotate(90deg)` : `rotate(-90deg)`};
      fill: ${({ theme }) => theme.textInverse};
      }
      &:hover{
        svg{
          fill: ${({ theme }) => theme.color.main.lighter};
          }
      }
    `