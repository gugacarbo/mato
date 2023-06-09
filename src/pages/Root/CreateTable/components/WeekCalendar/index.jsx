import styled from "styled-components";
import { useState, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as EyeSvg } from "../../../../../assets/eye.svg"
import { ReactComponent as EyeClosedSvg } from "../../../../../assets/eyeClosed.svg"
import parseHorario from '../../../../../util/parseHorario'
import PlanContext from "../../../../../context/PlanContext";

import colorsAll from '../.././../../../util/colors'
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
  "Qui",
  "Sex",
  "Sab",
]

const times = [
  //Matutino
  "07:30",
  "08:20",
  "09:10",
  "10:10",
  "11:00",
  //Vespertino
  "13:30",
  "14:20",
  "15:10",
  "16:20",
  "17:10",
  //Noturno
  "18:30",
  "19:20",
  "20:20",
  "21:10",
]

function WeekCalendar() {
  const { turmas, materias, colors, hovered } = useContext(PlanContext)
  const [showAllTime, setShowAllTime] = useState(false)

  var usedTurmas = {}
  let parsedTurmas
  let parsedTurmas2


  materias.forEach((mat) => {
    if (turmas[mat[0]] && !hovered[mat[0]]) {
      usedTurmas[mat[0]] = turmas[mat[0]]
    }
  })

  parsedTurmas = Object.keys(usedTurmas).map(turma =>
    turmas[turma][7].map(horario => {
      const parsed = parseHorario(horario)
      parsed.nome = turma
      return (parsed)
    })
  ).reduce((acc, val) => acc.concat(val), [])
    ?? []


  if (Object.keys(hovered).length > 0) {
    let usedTurmas2 = {}
    Object.keys(hovered).forEach((mat) => {
      usedTurmas2[mat] = hovered[mat]
    })

    parsedTurmas2 = Object.keys(usedTurmas2).map(turma =>
      hovered[turma][7].map(horario => {
        const parsed = parseHorario(horario)
        parsed.nome = turma
        return (parsed)
      })
    ).reduce((acc, val) => acc.concat(val), [])
      ?? []
    parsedTurmas = [
      ...parsedTurmas,
      ...parsedTurmas2,
    ]
  }





  const tableList = {}
  days.forEach((d) => {
    tableList[d] = {}
    times.forEach((t) => {
      tableList[d][t] = []
    })
  })

  parsedTurmas.forEach(pturma => {
    for (var n = 0; n < pturma.numeroDeAulas; n++) {
      tableList[pturma.diaDaSemana][nextClassTime(pturma.horarioDaPrimeiraAula, n)].push(pturma)
    }
  })

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



        {/*
        //TODO--Header 
        //TODO-Cabeçalho com os dias 
        */}
        {days.map((dia, i) => <TbHeader key={`header${i}d${dia}`}>{dia}</TbHeader>)}
        {/*
        //TODO-- 
        */}

        {/* Cada Período Mat, Vesp, Not */}
        {/* Para cada Periodo de Aula (Hora) */}
        {
          times.map(h => {
            //Aula em cada dia
            const allhours = days.map((dia, k) => {

              const subCount = tableList[dia][h].length;
              const subjects = subCount > 2 ? [...tableList[dia][h]].slice(0, 2) : tableList[dia][h];

              const othersSubjects = subCount > 2 ?
                [...tableList[dia][h]].slice(2).map(t => <HiddenSub color={colors?.[t.nome]}>{t.nome}</HiddenSub>) : [];
              //Celulas
              return (
                <SubjectBox key={`dia${dia}x${k}`} more={subCount > 2 ? subCount - 2 : ''}>
                  <ShowHiddenSubject>
                    {othersSubjects}
                  </ShowHiddenSubject>
                  {subjects.map((tur, i) =>
                    <SubjectCell className={`all-cells cell-${tur.nome} ${hovered[tur.nome] ? `shine` : ``}`} key={i} color={colors?.[tur.nome]}>
                      {showAllTime ?
                        `${tur.codigoDoDepartamento} - ${tur.codigoDaSala}${tur.numeroDaSala}` :
                        tur.nome
                      }
                    </SubjectCell>
                  )}




                </SubjectBox>
              )
            })

            const hourCell =
              <TbSideHeader>
                {<span>{h}</span>}
                {showAllTime && <span>{add50Min(h)}</span>}
              </TbSideHeader>

            return [hourCell, ...allhours];
          })
        }
        <Divider div={1} />
        <Divider div={2} />
      </Table>
    </Container>
  );
}

export default WeekCalendar;



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
z-index: 1;
`

const Table = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 1fr 1fr ;
  grid-template-rows: 0.6fr 1fr 1fr 1fr 1fr 1fr auto 1fr 1fr 1fr 1fr 1fr auto 1fr 1fr 1fr 1fr auto;
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
color: ${({ theme }) => theme.color.main.secondary};
font-size: 0.85rem;
font-weight: bold;


`
const TbSideHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
    align-items: center;
  font-size: 0.8rem;
    color: ${({ theme }) => theme.color.main.color};
    span:nth-child(2){
    color: ${({ theme }) => theme.color.main.secondary}aa;

  }
font-weight: bold;
  
  `
const MotionEye = styled(motion.button)`
background-color: transparent;
border: none;
outline: none;
cursor: pointer;
svg{
  width: 1.2rem;
  fill: ${({ theme, tp }) => tp == 'open' ? theme.text : theme.color.main.color + 'c7'};
}
`

const SubjectBox = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundMedium};

  row-gap: 0.1rem;
  &:has(label):hover label{
  opacity: 1;
  }
  
  &::after{
    
    ${({ more }) => more && `content: '+${more}';`}
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    transform: translate(30%, -30%);
    width: 1.2rem;
    border-bottom-left-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.color.main.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    font-family: 'Comfortaa';
    font-weight:400;
    aspect-ratio: 1;
}
`


const SubjectCell = styled.div`
  overflow: hidden;

  background-color: ${({ color, theme }) => color ?? theme.color.main.secondary};
  color: ${({ color, theme }) => {
    return color ? (colorsAll[color.toUpperCase()]) : theme.color.white
  }};
  flex: 1;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 0.85rem;
  transition: ${({ theme }) => theme.transition.fast};
  letter-spacing: 0.6px;
  &.shine{
    background-color: ${({ theme }) => theme.color.white};

    box-shadow: ${({ color, theme }) => `${theme.shadown} ${color ?? theme.color.white}`};    

    border: 1px solid ${({ theme, color }) => color ?? theme.color.black}; 
    color: ${({ color, theme }) => color ?? theme.color.black};   
    
    background-color: ${({ color, theme }) => {
    return color ? (colorsAll[color.toUpperCase()]) : theme.color.white
  }};

  }
  &.dim{
    opacity: 0.2;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color.white};    
}
`



const HiddenSub = styled.div`

background-color: ${({ color }) => color};
color: ${({ color, theme }) => {
    return color ? (colorsAll[color.toUpperCase()]) : theme.color.main.secondary
  }};
  padding: 0.4rem;
  font-weight: bold;
`


const ShowHiddenSubject = styled.label`
    position: absolute;
    top: 0.5rem;
    opacity: 0;
    pointer-events: none;
    left: 100%;
    z-index: 1;
    flex-direction: column;
    overflow: hidden;
    background-color: ${({ theme }) => theme.color.white};
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition.main};
    
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    font-family: 'Comfortaa';
    font-weight:400;
    z-index: 100;
`


const Divider = styled.div`
  grid-column: 1/8;
  padding: 0.55px 0;
  background-color: ${({ theme }) => theme.color.gray};

  grid-row: ${({ div }) => {
    switch (div) {
      case 1:
        return (`7/8`)
      case 2:
        return (`13/14`)
      default:
        return (`18/19`)
    }
  }};
`

//@param {String} "10:10"
function nextClassTime(horario, numero = 1) {
  if (numero >= 0 && numero < times.length) {
    const indice = times.indexOf(horario);

    if (indice !== -1) {
      const indiceHorario = indice + numero;

      if (indiceHorario >= 0 && indiceHorario < times.length) {
        return times[indiceHorario];
      }
    }
  }

  return null;
}
function add50Min(time, qtd = 1) {
  let regex = /^(\d{2}):(\d{2})$/;
  const [hora, minuto] = time.match(regex).slice(1);
  let date = new Date();
  date.setHours(hora);
  date.setMinutes(parseInt(minuto) + (50 * qtd));
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
