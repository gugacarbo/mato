import styled from "styled-components";
import { useContext, useState, useEffect } from 'react'
import DataContext from "../../../context/DataContext";
import ReactSelect, { components } from 'react-select'
import { ReactComponent as ArrowDownSvg } from '../../../assets/arrow_down.svg'
import { motion } from "framer-motion";

function SelectCampus() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { map, setCampus } = useContext(DataContext);

  const [currentCampus, setCurrentCampus] = useState({})

  const options = !map?.campus ? [] : map.campus.map(c => ({ value: c[0], label: c[1] })).reverse()

  useEffect(() => {
    setTimeout(() => {
      setCurrentCampus(options[1] ?? options[0] ?? {})
      setCampus(options[1] ?? options[0] ?? {})
    }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [map])

  const DropdownIndicator = (
    props
  ) => {
    return (
      <StyledDrop {...props} menuOpen={menuOpen}>
        <ArrowDownSvg />
      </StyledDrop>
    );
  };

  if (!map?.campus || map?.campus.lenght == 0) {
    return <></>
  }

  return (
    <SelectCampusBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span>Campus</span>
      <Select
        options={options}
        placeholder="Selecione"
        noOptionsMessage={() => <NotingFound>Nenhum Encontrado</NotingFound>}
        closeMenuOnSelect={true}
        onChange={(val) => {
          setCurrentCampus(val)
        }}
        value={currentCampus}
        isSearchable={true}
        classNamePrefix={'s'}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => <></>
        }}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />
      <NextButton
        initial={{
          opacity: 0,
          x: "-70%"
        }}
        animate={{
          opacity: currentCampus ? 1 : 0,
          x: currentCampus ? "-5%" : "-100%"
        }}
        whileHover={{
          x: "5%"
        }}
        exit={{
          opacity: 0,
          x: "100%"
        }}
        onClick={() => setCampus(currentCampus)}
      >
        <span>Próximo</span>
        <ArrowDownSvg />
      </NextButton>
    </SelectCampusBox>
  );
}
export default SelectCampus;




const SelectCampusBox = styled(motion.div)`
position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  font-size: 2rem;
  gap: 1rem;
  span{
    color: ${({ theme }) => theme.color.text};
  font-size: 1.8rem;
  }

`

const StyledDrop = styled(components.DropdownIndicator)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  svg{

    transform: ${({ menuOpen }) => menuOpen ? `rotateX(180deg)` : `rotateX(0deg)`};
    width: 1.7rem;
    height: 1.7rem;
    fill: #fefefe;
  }
`


const Select = styled(ReactSelect)`
min-width: 150px;
font-size: 2.3rem;
color: ${({ theme }) => theme.color.text};
/* background-color: #ff0; */

  & .s__control {
cursor: pointer;

    border: none;
    background-color: transparent;
    /* flex-direction: row-reverse; */

    &:hover{
      box-shadow: none;
      
    }

    &.s__control--is-focused{
      box-shadow: none;
      border:none;
    }

    & .s__value-container {
      padding: 0;
      & .s__input-container {
        text-align: center;
      color: ${({ theme }) => theme.color.text};
    }
      &.s__value-container--has-value {
        & .s__single-value{
        text-align: center;

          /* color: ${({ theme }) => theme.color.text}; */
          color: ${({ theme }) => theme.color.main.light};
        }
      }
    }


    & .s__indicator  {
      &.s__dropdown-indicator  {
      }
    }
  }
  & .s__menu{
    font-size: 1.5rem;
    box-shadow: none;
    border-radius: 10px;
    overflow: hidden;
    & .s__menu-list{
      padding: 0;
      border-radius: 0px;
      & .s__option{
        border-radius: 0px;
        color: ${({ theme }) => theme.color.black};
        text-align: center;
          &:hover{
          color: ${({ theme }) => theme.color.white};
          background-color: ${({ theme }) => theme.color.main.color};
        }
        &.s__option--is-selected{
          color: ${({ theme }) => theme.color.white};
          background-color: ${({ theme }) => theme.color.main.darker};
        }
      }
      & .s__menu-notice{
      }
    }
  }
`


const NextButton = styled(motion.button)`
background-color: transparent;
display: flex;
  justify-content: center;
  align-items: center;
border: none;
outline:none;

gap: 0.3rem;
cursor  :pointer ;
span{
  font-size: 1.8rem;
}
svg{
  width: 2rem;
  transform: rotateZ(-90deg);
  aspect-ratio: 1;
  fill: ${({ theme }) => theme.color.text};
}
`


const NotingFound = styled.small`
  font-size: 1rem;
  white-space: nowrap;

`