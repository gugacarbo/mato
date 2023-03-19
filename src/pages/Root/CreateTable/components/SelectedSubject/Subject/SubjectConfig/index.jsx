import { motion } from "framer-motion";
import styled from "styled-components";
import Turma from "./Turma";



function SubjectConfig({ e, showConfig, ...props }) {


  return (<ConfigBox
    initial={{
      height: 0
    }}
    animate={{
      height: showConfig ? 'auto' : 0,
    }}
    exit={{
      height: 0
    }}
  >
    <ConfigContainer>

      <Name
        animate={{
          opacity: showConfig ? 1 : 0
        }}
      >{e[2]}</Name>
      <Turmas>
        {e[3].map(turma => <Turma turma={turma} materia={e} />)}
      </Turmas>
    </ConfigContainer>
  </ConfigBox>);
}


export default SubjectConfig;

const ConfigBox = styled(motion.div)`
  grid-row: 2/3;
  grid-column: 1/6;
  width: 100%;
  overflow: hidden;
    display: grid;
    place-items: center;
  ;
  `
const ConfigContainer = styled.div`
  width: 98%;

   display: grid;
   padding: 0.5rem;
   grid-gap: 1rem;
   place-items: center;
   grid-template-columns: 1fr;
   background-color: ${({ theme }) => theme.backgroundMedium}aa;
   border-radius: 4px;
   margin-bottom: 0.3rem;
   grid-template-areas: 
   'name name name name'
   'turmas turmas turmas turmas';
  `

const Name = styled(motion.span)`
  grid-area: name;
  font-size: 0.8rem;
  font-weight: 400;
  font-family: "Comfortaa";
  width: 100%;
  `

const Turmas = styled.div`
  grid-area: turmas;
  display: flex;
  width: 100%;
  flex-direction: column;
  `
