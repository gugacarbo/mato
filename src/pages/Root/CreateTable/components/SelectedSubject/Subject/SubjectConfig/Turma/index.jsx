import styled from "styled-components";
import ClassInfo from "./ClassInfo";
import { useDetectClickOutside } from "react-detect-click-outside";

import { ReactComponent as ArrowDownSvg } from '../../../../../../../../assets/arrow_down.svg'

import { useContext, useState, useEffect } from 'react'

import PlanContext from "../../../../../../../../context/PlanContext";


import AllColors from '../../../../../../../../util/colors'


function Turma({ turma, materia }) {
  const [showClass, setShowClass] = useState(false)
  const { turmas, colors, setTurma, setHovered, combination, disableClose } = useContext(PlanContext)
  const turmaRef = useDetectClickOutside({ onTriggered: () => !disableClose && setShowClass(false) });

  let status = "ok";

  if (turma[2] - turma[3] <= 5 || turma[5] <= 5) {
    status = "lotando"
  }

  if (turma[2] - turma[3] == 0 || turma[5] == 0) {
    status = "lotado"
  }

  if (combination?.[materia?.[0]]?.[0] == turma?.[0]) {
    status = "combinacao"
  }

  useEffect(() => {
    if (!turmas?.[materia[0]]) {
      setTurma(materia, turma)
    }
  }, [])


  return (
    <ClassContainer
      ref={turmaRef}
      showClass={showClass}
      status={status}
      onMouseEnter={() => {
        setHovered(materia[0], turma)
      }}
      onMouseLeave={() => {
        setHovered()
      }}
    >
      <ClassRadio color={colors[materia[0]]}>
        <input
          type="checkbox"
          name={`materia${materia[0]}`}
          checked={turmas[materia[0]] == turma}
          onClick={() => {
            setTurma(materia, turma)
          }}
        />
      </ClassRadio>

      <ClassCode
        onClick={() => {
          setShowClass(prev => !prev)
        }}
        checked={turmas[materia[0]] == turma}
        color={colors[materia[0]]}
        status={status}
      >
        <b
          onClick={() => {
            setTurma(materia, turma)
          }}
        >{turma[0]}</b>
        <span>  {turma[3]}/{turma[2]} <i>({turma[5]})</i><ArrowDownSvg /></span>
      </ClassCode>
      <ClassInfo
        onClick={() => setShowClass(prev => !prev)}
        turma={turma}
        showClass={showClass}
        setShowClass={setShowClass} />
    </ClassContainer>
  );
}



export default Turma;

const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  padding: 0.4rem;
  border-radius: 0.1rem;
  border-bottom: 1px solid ${({ theme, showClass }) => showClass ? theme.color.main.color : theme.color.darkGray};
 
  ${({ status }) => status == 'lotado' && `order: 1;`}
   small{
    font-size: 0.75rem;
   }
  `

const ClassCode = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  justify-content: space-between;
  padding:0 0.5rem;
   cursor: pointer;

  b{
    font-size: 0.9rem;
    color: ${({ theme, status, color, checked }) => {
    if (status == 'cancelada') {
      return (theme.color.red)
    }
    if (checked) {
      if (status == 'combinacao') {
        return (theme.color.main.secondary)
      }
      return (`${color}; text-shadow: ${theme.color?.[AllColors[color]] ?? theme.text}de 0px 0px 3px ` ?? theme.text)
    }
    return (theme.text)
  }};
  }
  
  span{
    font-size: 0.85rem;
    display: flex;
   align-items: center;
   gap: 0.5rem;
    i{
      font-weight:bold;
      font-style: normal;
  color: ${({ theme, status }) => {
    switch (status) {
      case 'lotando':
        return theme.color.orange;
      case 'lotado':
        return theme.color.red;
      default:
        return theme.text
    }
  }};
    }
  }

  svg{
    width: 0.8rem;
    fill: ${({ theme }) => theme.text};
    cursor: pointer;
    &:hover{
      fill: ${({ theme }) => theme.color.main.lighter};

    }
  }

`




const ClassRadio = styled.label`
  width: 0.8rem;
  margin: 0.2rem;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.color.mediumGray};
  transition: ${({ theme }) => theme.transition.main};
  border: 1px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 50%;
  cursor: pointer;
  &:has(input:checked){
    background-color: ${({ color }) => color};
    box-shadow: 0 0 2px 0px  ${({ color }) => color};
  }
  input{
    display: none;
  }
 `