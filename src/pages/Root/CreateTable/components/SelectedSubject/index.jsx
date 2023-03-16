import styled from "styled-components";
import { useContext } from "react";
import PlanContext from "../../../../../context/PlanContext";
import { AnimatePresence } from "framer-motion";
import Subject from "./Subject";
import { ReactComponent as EllipsisSvg } from "../../../../../assets/ellipsis.svg"

function SelectedSubject() {
  const { materias } = useContext(PlanContext)

  return (
    <Container>
      <ListHeader>
        <span>Cor</span>
        <span>Cód</span>
        <span>Turma</span>
        <span>Nome</span>
        <EllipsisIcon />
      </ListHeader>
      <Scroller>
        <AnimatePresence>
          {materias.map((e, k) =>
            <Subject e={e} z={{ zIndex: materias.length - k }} key={e[0]} />
          )}
        </AnimatePresence>
      </Scroller>
    </Container>
  );
}

export default SelectedSubject;



const Container = styled.div`
grid-area: list;
display: flex;
width: 98%;
height: 98%;
margin: 1%;
flex-direction: column;
align-items: center;
background-color: ${({ theme }) => theme.color.lightGray}22;
box-shadow: 2px 2px 13px -5px ${({ theme }) => theme.color.main.light}8d;
border-radius: 10px;
overflow: hidden;
z-index: 1;
position: relative;
`

const ListHeader = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray};
  border-bottom: 1px solid ${({ theme }) => theme.color.main.darker};
  padding:  0.6rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-columns: 2rem 4.5rem 4rem 1fr auto;
  place-items: center;
  
  span{
    font-size: 0.85rem;

  }
`

const EllipsisIcon = styled(EllipsisSvg)`
  width: 3rem;
  margin-right: 0.25rem;
  padding: 0 1rem;
  fill: ${({ theme }) => theme.color.white}99;
`
const Scroller = styled.div`
display: flex;
flex-direction: column;
align-items: center;
grid-gap: 0.3rem;
row-gap: 0.5rem;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
padding: 0.6rem;

padding-top: 0.5rem;
`
