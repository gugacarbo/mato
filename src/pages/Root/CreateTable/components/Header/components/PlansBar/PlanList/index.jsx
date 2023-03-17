import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import PlanContext from "../../../../../../../../context/PlanContext";
import { motion } from "framer-motion";
import PlanItem from "./PlanItem";

function PlanList({ openList }) {
  const { plans, createPlan } = useContext(PlanContext)

  const options = Object.keys(plans).map(c => c)

  return (
    <List
      initial={{
        height: 0
      }}
      animate={{
        height: openList ? 'auto' : 0,
      }}
      exit={{
        height: 0
      }}
    >
      <ListContent>
        {options.map(item => <PlanItem item={item} />)}
      </ListContent>
      <AddItem onClick={() => createPlan()}>
        Adicionar Plano
      </AddItem>
    </List>
  );
}

export default PlanList;

const AddItem = styled.button`
border: none;
outline: none;
background-color: transparent;
color: ${({ theme }) => theme.color.white};
font-size: 0.9rem;
font-weight: 400;
font-size: 'Poppins';
padding: 0.5rem 0;
width: 100%;

cursor: pointer;
&:hover{
  background-color: #ddd;
  }
`

const List = styled(motion.div)`
border-radius: 3px;
position: absolute;
top: calc(100% + 0.5rem);
color: ${({ theme }) => theme.color.white};
background-color: ${({ theme }) => theme.color.mediumGray};
  overflow: hidden;
`

const ListContent = styled.div`
padding: 1rem 0;
display: flex;
flex-direction: column;
align-items: center;
`

