import styled from "styled-components";
import { useContext } from "react";
import PlanContext from "../../../../../context/PlanContext";
import { AnimatePresence } from "framer-motion";
import Subject from "./Subject";

function SelectedSubject() {
  const { materias } = useContext(PlanContext)

  return (
    <Container>
      <AnimatePresence>
        {materias.map((e, k) =>
          <Subject e={e} z={{ zIndex: materias.length - k }} key={e[0]} />
        )}
      </AnimatePresence>
    </Container>
  );
}

export default SelectedSubject;



const Container = styled.div`
grid-area: list;

display: flex;
width: 98%;
height: 48%;
margin: 1%;
flex-direction: column;
align-items: center;
grid-gap: 0.3rem;
row-gap: 0.5rem;
background-color: ${({ theme }) => theme.color.lightGray}22;
box-shadow: 2px 2px 13px -5px ${({ theme }) => theme.color.main.light}8d;
border-radius: 10px;
padding: 1rem;
overflow: hidden;
z-index: 1;
overflow-y: auto;
`