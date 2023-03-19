import { motion } from "framer-motion";
import { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import styled from "styled-components";

import PlanContext from "../../../../../../../context/PlanContext";

function Config({
  openConfig: open,
  setOpenConfig
}) {

  const { config, setConfig, configLabels, disableClose } = useContext(PlanContext)
  const configRef = useDetectClickOutside({ onTriggered: () => open && !disableClose && setOpenConfig(false) });

  const animation = {
    animate: {
      opacity: open ? 1 : 0,
      x: open ? 0 : "80%",
      pointerEvents: open ? 'all' : "none",
      // width: open ? "auto" : 0,
    }
  }
  return (<ConfigContainer {...animation}>
    <Content ref={configRef}>
      <h3>Configurações</h3>
      {
        Object.keys(config).map((c) => {
          return (
            <ConfigOption>
              <span>
                {configLabels[c]}
              </span>
              <Toggle checked={config[c]} setConfig={(val) => setConfig(prev => {
                const s = { ...prev };
                s[c] = val;
                return (s)
              })} />
            </ConfigOption>
          )
        })
      }
    </Content>
  </ConfigContainer>);
}

export default Config;

const ConfigContainer = styled(motion.div)`
  z-index: 10;
  top: 100%;
  right: 0;
  overflow: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => `${theme.shadown} ${theme.color.white},${theme.shadown} ${theme.color.main.color}`};
`
const Content = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 0.5rem;
h3{
  font-size: 0.95rem;
}
`

const ConfigOption = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem 1rem;
  span{
    font-size: 0.95rem;
      white-space: nowrap;
    }
  `


function Toggle({
  checked, setConfig
}) {
  return (
    <ToggleBox checked={checked} >
      <input checked={checked} onChange={({ target }) => setConfig(target.checked)} type="checkbox" />
    </ToggleBox>
  );
}

const ToggleBox = styled.label`

  height: 1rem;
  aspect-ratio: 2;

  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.backgroundMedium};
  transition: ${({ theme }) => theme.transition.main};
  background-color: ${({ theme }) => theme.backgroundLight};

  cursor: pointer;
  position: relative;

  &::after{
    content: "";
    position: absolute;
    transition: ${({ theme }) => theme.transition.main};
  background-color: ${({ theme }) => theme.backgroundDark};

    height: calc(100%);
    aspect-ratio: 1;
    border-radius: 50%;
    top:0;
    left: 0px;
  }

  &:has(input:checked){
  border-color: ${({ theme }) => theme.color.main.color}44;
  &::after{
    background-color: ${({ theme }) => theme.color.main.light};

    transform: translateX(calc(100% + 2px));
  }
  }
input{
  opacity: 0;
  position: absolute;
}
  `

