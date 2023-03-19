import styled from "styled-components";
import { useState, useContext } from "react";

import { ReactComponent as ArrowDownSvg } from "../../../../../../../assets/arrow_down.svg";
import PlanContext from "../../../../../../../context/PlanContext";
import PlanList from "./PlanList";


function PlansBar() {
  const { currentPlanName } = useContext(PlanContext)
  const [openList, setOpenList] = useState(false)

  return (
    <PlanBarContent openList={openList}>
      <span>Plano: </span>
      <CurrentPlanName onClick={() => setOpenList(prev => !prev)}>
        {currentPlanName}
      </CurrentPlanName>
      <OpenListButton
        onClick={() => setOpenList(prev => !prev)}
        openList={openList}
      >
        <ArrowDownSvg />
      </OpenListButton>
      <PlanList openList={openList} />
    </PlanBarContent>);
}

export default PlansBar;

const PlanBarContent = styled.div`
  grid-area: plans;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
    width: fit-content;
  gap: 1rem;
  padding: 0rem 1rem;
  margin: 0 auto;
  
  background-color: ${({ theme }) => theme.backgroundMedium};
  box-shadow: 1px 1px 4px -0px ${({ theme, openList }) => openList ? theme.color.main.color : theme.color.main.light + '8d'};
`


const CurrentPlanName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  
  min-width: 12rem;
  width: fit-content;
  max-width: 20rem;

  padding: 0.1rem 2rem;
  
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  
  text-align: center;
  border: none;
  outline: none;
  font-size: 1rem;
`

const OpenListButton = styled.button`
  
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  
  svg{
    width: 1rem;
    fill: ${({ theme, openList }) => openList ? theme.color.main.light : theme.color.white};
    
    transition: ${({ theme }) => theme.transition.main};
    transform: ${({ openList }) => `rotate(${openList ? 180 : 0}deg)`};
  }
  &:hover svg{
    fill: ${({ theme }) => theme.color.main.light};
  }

`

