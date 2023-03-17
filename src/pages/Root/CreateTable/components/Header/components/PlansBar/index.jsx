import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import PlanContext from "../../../../../../../context/PlanContext";
import { ReactComponent as ArrowDownSvg } from "../../../../../../../assets/arrow_down.svg";
import PlanList from "./PlanList";


function PlansBar() {
  const { currentPlanName, plans, changeCurrentName } = useContext(PlanContext)
  // const options = Object.keys(plans).map(c => ({ value: c, label: c }))

  const [openList, setOpenList] = useState(false)


  return (
    <BarContent>
      <span>Plano: </span>
      <InputName >
        <PlanList openList={openList} setOpenList={setOpenList} />
        {currentPlanName}

      </InputName>
      <Button
        onClick={() => setOpenList(prev => !prev)}
      >
        <ArrowDownSvg />
      </Button>
    </BarContent>);
}

export default PlansBar;

const BarContent = styled.div`
  grid-area:plans;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;

`


const InputName = styled.span`
min-width: 12rem;
width: fit-content;
  background-color: transparent;
  text-align: center;
  border: none;
  outline: none;
  max-width: 20rem;
  color: ${({ theme }) => theme.color.white};
  font-size: 1rem;
  padding: 0.1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.main.light};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

`
const Button = styled.button`
    background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  svg{
    fill: ${({ theme }) => theme.color.white};
    transition: ${({ theme }) => theme.transition.main};
    width: 1rem;
  }
  &:hover{
    svg{

      fill: ${({ theme }) => theme.color.main.light};
    }
  }
`

