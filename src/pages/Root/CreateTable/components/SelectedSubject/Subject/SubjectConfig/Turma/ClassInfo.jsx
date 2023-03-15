import styled from "styled-components";
import { motion } from "framer-motion";
import { useContext, useState } from 'react'

import PlanContext from "../../../../../../../../context/PlanContext";

function ClassInfo({ turma, showClass, setShowClass }) {

  const { turmas } = useContext(PlanContext)
  return (
    <Info
      initial={{
        height: 0
      }}
      animate={{
        height: showClass ? 'auto' : 0,
        x: showClass ? 0 : -10,
      }}
      exit={{
        height: 0
      }}
    >
      <Head><small>turma</small> <small>vagas</small></Head>
      <InfoContent>
        <span>horas-aula: {turma[1]}</span>
        <span>créditos: {turma[1] / 18}</span>
      </InfoContent>
      <Professors>
        <b>Professores</b>
        {turma[8].map(professor =>
          <span>{professor}</span>
        )}
      </Professors>
    </Info>
  );
}

/**
 0 cod_turma, !
 1 horas_aula, !
 2 vagas_ocupadas,   
 3 vagas_ofertadas, 
 4 alunos_especiais, 
 5 saldo_vagas, 
 6 pedidos_sem_vaga, x
 7 horarios,
 8 professores
 */


export default ClassInfo;

const Info = styled(motion.div)`
  grid-column: 1/3;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.4rem;

`
const Head = styled.div`
  width: 100%;
  padding: 0.1rem 1.6rem;
  grid-column: 1/3;
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.main.secondary};
  small{
    font-weight: bold;
    font-size: 0.8rem;
  } 
`

const InfoContent = styled.div`
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  font-size: 0.9rem;
  row-gap: 0.2rem;
  flex-direction: column;
  `
const Professors = styled.div`
padding-right: 0.5rem;
padding-top: 0.5rem;
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  place-items: end center;
  b{
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
  }
    span{
      font-size: 0.8rem;
    }
  `

