import styled from "styled-components";
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as EyeSvg } from "../../../../../assets/eye.svg"
import { ReactComponent as EyeClosedSvg } from "../../../../../assets/eyeClosed.svg"
function WeekCalendar() {
  const [showAllTime, setShowAllTime] = useState(false)

  const eyeAnimationPresset = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.7,

    },
  }

  const days = [
    "Seg",
    "Ter",
    "Qua",
    "Qua",
    "Qui",
    "Sex",
  ]

  const times = [
    [
      ["7:30", "8:20"],
      ["8:20", "9:10"],
      ["9:10", "10:00"],
      ["10:10", "11:00"],
      ["11:00", "11:50"],
    ],
    [
      ["13:30", "14:20"],
      ["14:20", "15:10"],
      ["15:10", "16:00"],
      ["16:20", "17:10"],
      ["17:10", "18:00"],
    ],
    [
      ["18:30", "19:20"],
      ["19:20", "20:10"],
      ["20:20", "21:10"],
      ["21:20", "22:00"],
    ],
  ]


  return (
    <Container>
      <Table>
        <TbHeader onClick={() => setShowAllTime((prev) => !prev)}>
          <AnimatePresence mode="popLayout">
            {
              !showAllTime ?
                <MotionEye tp="open" key="show" {...eyeAnimationPresset} >
                  <EyeSvg />
                </MotionEye>
                :
                <MotionEye key="hide" {...eyeAnimationPresset} >
                  <EyeClosedSvg />
                </MotionEye>
            }
          </AnimatePresence>

        </TbHeader>


        {/**
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
          \-------------------- dia da semana
        
         */}
        {days.map((d, i) => <TbHeader key={`d${d}i${i}`}>{d}</TbHeader>)}
        {times.map(p => {
          const it = p.map(h => {
            const dd = days.map((d, k) => <SubjectBox key={`d${d}x${k}`}>{d}</SubjectBox>);

            const hourBox =
              <TbSideHeader>
                {<span>{h[0]}</span>}
                {showAllTime && <span>{h[1]}</span>}
              </TbSideHeader>
            return [hourBox, ...dd];
          })
          const dv = <Divider />
          return [it, dv]
        }
        )}
      </Table>
    </Container>
  );
}

export default WeekCalendar;

const MotionEye = styled(motion.button)`
background-color: transparent;
border: none;
outline: none;
cursor: pointer;
svg{
  width: 1.3rem;
  fill: ${({ theme, tp }) => tp == 'open' ? theme.color.white : theme.color.main.color + 'c7'};
}
`


const Container = styled.div`
grid-area: table;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
overflow: hidden;
position: relative;
padding: 1rem;
`

const Table = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 0.6fr 1fr 1fr 1fr 1fr 1fr auto 1fr 1fr 1fr 1fr 1fr auto 1fr 1fr 1fr 1fr ;
  grid-gap: 0.3rem;
  div{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  `

const TbHeader = styled.div`
display: flex;
justify-content: center;
color: #09c;
`
const TbSideHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  color: #f90;
  font-size: 0.9rem;
  span:nth-child(2){
    color: #f00;

  }
  
  `

const SubjectBox = styled.div`
display: flex;
justify-content:center;
  align-items: center;
background-color: #555;

`

const Divider = styled.div`
  grid-column: 1/8;
`