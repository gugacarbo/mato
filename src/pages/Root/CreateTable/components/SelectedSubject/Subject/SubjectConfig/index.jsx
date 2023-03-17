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
      padding: showConfig ? '0.5rem' : 0,
    }}
    exit={{
      height: 0
    }}

  >
    <Name
      animate={{
        opacity: showConfig ? 1 : 0
      }}
    >{e[2]}</Name>
    <Turmas>
      {e[3].map(turma => <Turma turma={turma} materia={e} />)}
    </Turmas>
  </ConfigBox>);
}


export default SubjectConfig;

const ConfigBox = styled(motion.div)`
  grid-row: 2/3;
  grid-column: 1/6;
  overflow: hidden;
  display: grid;
  width: 100%;
  grid-gap: 1rem;
  place-items: center;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.color.gray}aa;
  border-radius: 4px;
  margin-bottom: 0.3rem;
  grid-template-areas: 
  'name name name name'
  'turmas turmas turmas turmas'
  ;
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

/**
           [ 
            codigo,
            nome_Uniode,
            nome,
              [
              cod_turma, 
              horas_aula, 
              vagas_ofertadas, 
              vagas_ocupadas, 
              alunos_especiais, 
              saldo_vagas, 
              pedidos_sem_vaga, 
              [
                [horarios], 
                [professores]
              ]
            ]
// ! --------------------------------------
           [
             "MTM3110",
             "CALCULO 1 *FISICA - BACHARELADO",
             "Cálculo 1 *FÍSICA - Bacharelado",
            [
              "01002",
              72,
              62,
              61,
              0,
              1,
              0,
              [
                ["3.1330-2 / EF1-EFI305", "6.1510-2 / EF1-EFI305"],
                ["Luiz Augusto Saeger"]
              ]
            ]
 
         "3.1330-2 / EF1-EFI305"
          | |    |   |   \----- código da sala
          | |    |   \--------- código do departamento
          | |    \------------- número de aulas seguidas no bloco
          | \------------------ horário da primeira aula do bloco
          \-------------------- dia da semana seg=2 terc=3 qua=4
        
         */