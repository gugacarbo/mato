import { ReactComponent as Trash } from "../../../../../../assets/trash.svg"
import { ReactComponent as ArrowDownIcon } from "../../../../../../assets/arrow_down.svg"
import { ReactComponent as XIcon } from "../../../../../../assets/x.svg"
import { GithubPicker } from 'react-color'
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import PlanContext from "../../../../../../context/PlanContext";
import { motion, AnimatePresence } from "framer-motion";
import { useDetectClickOutside } from 'react-detect-click-outside';

import AllColors from "../../../../../../util/colors"

function Subject({ e, z, key }) {

  var status = "ok";
  if (/reservad/i.exec(e[2])) {
    // status = 'reservada'
  }
  if (/cancelada/i.exec(e[2])) {
    status = 'cancelada'
  }

  const { removeFromPlan, setColor, colors, turmas, setTurma } = useContext(PlanContext)

  const [color, setCurrentColor] = useState(colors?.[e?.[0]] ?? Object.keys(AllColors)[parseInt(Math.random() * Object.keys(AllColors).length)])
  const [turma, setCurrentTurma] = useState(turmas?.[e?.[0]] ?? e[3][0])
  const [showColorMenu, setShowColorMenu] = useState(false)

  const [showConfig, setShowConfig] = useState(false)

  const ref = useDetectClickOutside({ onTriggered: () => setShowColorMenu(false) });


  useEffect(() => {

    if (!turmas?.[e?.[0]]) {
      setTurma(e, turma)
    }

  }, [e])

  const subjectAnimations = {
    initial: {
      opacity: 0,
      x: "100%"
    },
    animate: {
      opacity: 1,
      x: "0%"
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: 0.2
      }
    }
  }



  return (
    <Container {...subjectAnimations} style={z}>
      <ColorBox ref={ref}>

        <ColorDisplay
          animate={status != 'cancelada' && { backgroundColor: color, scale: showColorMenu ? 1.1 : 1 }}
          onClick={() => status != 'cancelada' && setShowColorMenu(prev => !prev)}
          color={AllColors[color.toUpperCase()]}
          whileHover={status != 'cancelada' && {
            scale: 1.1
          }}
        >{showColorMenu && <XIcon />}</ColorDisplay>

        {showColorMenu &&
          <PickBox >
            <GetColor
              colors={Object.keys(AllColors)}
              color={color}
              onChange={(c) => setCurrentColor(c.hex)}
              onChangeComplete={(c) => setColor(e, c.hex)}
            />
          </PickBox>
        }
      </ColorBox>
      <b>{e[0]}</b>
      <i>{turma[0]}</i>

      <Name status={status} onClick={() => setShowConfig(prev => !prev)}><span>{e[2]}</span></Name>

      <Buttons>
        <ShowInfo onClick={() => setShowConfig(prev => !prev)} />
        <DeleteIcon onClick={() => removeFromPlan(e)} />
      </Buttons>
      <AnimatePresence >
        {showConfig &&
          <ConfigBox
            initial={{
              height: 0
            }}
            animate={{
              height: 'auto',
            }}
            exit={{
              height: 0
            }}

          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus dolore, minima nihil ea consequatur quam assumenda provident magni nesciunt quae ex fugiat ullam, nobis ab sint. Nisi, pariatur illo.
          </ConfigBox>
        }
      </AnimatePresence>
    </Container >

  );
}

export default Subject;


const ConfigBox = styled(motion.div)`
  grid-row: 2/3;
  grid-column: 1/6;
  overflow: hidden;
`


const Container = styled(motion.div)`
  width: 100%;
  font-size: .9rem;
  font-weight: 400;
  display: grid;
  padding-bottom: 0.2rem;
  grid-template-rows: 1fr auto;
  grid-template-columns: 2rem 4.5rem 4rem 1fr auto;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray}55;
  place-items: center;
  position: relative;

  b{
    font-weight: 400;
    color: ${({ theme }) => theme.color.main.light};
  }
  i{
    font-style: normal;
    color: ${({ theme }) => theme.color.main.secondary};
    font-weight: 400;
  }
`
const ColorBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`


const ColorDisplay = styled(motion.div)`
  height: 1.3rem;
  aspect-ratio: 1;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid  ${({ theme, color }) => color ?? theme.color.white};
  
  svg{
    width: 50%;
    fill: ${({ theme, color }) => color ?? theme.color.white};

  
  }
`

const PickBox = styled.div`
  top: 100%;
  left: 0%;
  position:absolute;
  `

const GetColor = styled(GithubPicker)`
  top: 100%;
  left: 0%;
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
    height: 100%;
  padding: 0 0.7rem;
  gap: 0.8rem;
`

const ShowInfo = styled(ArrowDownIcon)`
  height: 0.9rem;
  margin: auto;
  fill: ${({ theme }) => theme.color.white};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.main};
  &:hover{
    transform: translateY(15%);
    fill: ${({ theme }) => theme.color.main.light};
  }
`

const DeleteIcon = styled(Trash)`
  height: 0.9rem;
  margin: auto;
  transition: ${({ theme }) => theme.transition.main};

  fill: ${({ theme }) => theme.color.red};
  cursor: pointer;
  &:hover{
    transform: scale(1.1);

    fill: ${({ theme }) => theme.color.white};
  }
`

const Name = styled.div`
width: 100%;
  overflow: hidden;
  position: relative;
  span{
    ${({ status, theme }) => {

    if (status == 'cancelada') {
      return (`color:${theme.color.red};`)
    }
  }}
    white-space: nowrap;
    text-overflow: ellipsis;

  }
`

