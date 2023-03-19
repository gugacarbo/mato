import styled from "styled-components";
import { useContext } from 'react'
import StyleContext from '../../../../../../context/StyleContext'

function ThemeToggler() {
  const { setTheme, theme } = useContext(StyleContext)
  return (
    <TogglerBox>
      <input
        type="checkbox"
        onChange={() => setTheme()}
        checked={theme.name == "light"}
      />

    </TogglerBox>
  );
}

export default ThemeToggler;

const TogglerBox = styled.label`
  grid-area: theme;
  margin: auto;
  position: relative;
  width: 3rem;
  aspect-ratio: 1.9;
  border:1px solid ${({ theme }) => theme.backgroundDarker};
  background-color: ${({ theme }) => theme.backgroundMedium};
  overflow: hidden;
  border-radius: 40px;
  cursor: pointer;
  input{
    visibility: hidden;
  }
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100%);
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.backgroundDark};
    transition: ${({ theme }) => theme.transition.main};
  }
  &:has(input:checked){
    &::after{
      background-color: ${({ theme }) => theme.color.main.light};
      transform: translateX(100%);
    } 
  }
`