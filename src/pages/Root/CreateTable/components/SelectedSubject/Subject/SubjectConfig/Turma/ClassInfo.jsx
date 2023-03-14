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
        {turma[8].map(professor =>
          <span>{professor}</span>
        )}
      </InfoContent>
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
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
`
const InfoContent = styled.div`
padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
`

const Head = styled.div`
  width: 100%;
  padding: 0.1rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({theme})=>theme.color.main.secondary}
`