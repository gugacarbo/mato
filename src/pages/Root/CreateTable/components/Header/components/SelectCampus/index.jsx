import styled from "styled-components";
import { useContext, useState, useEffect } from 'react'
import DataContext from "../../../../../../../context/DataContext";
import ReactSelect, { components } from 'react-select'
import { ReactComponent as ArrowDownSvg } from '../../../../../../../assets/arrow_down.svg'
import { motion } from "framer-motion";

function SelectCampus() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { map, campus, setCampus } = useContext(DataContext);

  const options = !map?.campus ? [] : map.campus.map(c => ({ value: c[0], label: c[1] })).reverse()

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
      <label htmlFor="">
        <span>Período</span>
        <b>
          {map.ano}-{map.semestre}
        </b>
      </label>
      <label >
        <span>Campus</span>
        <Select
          defaultValue={campus}
          options={options}
          placeholder="Selecione"
          noOptionsMessage={() => <NotingFound>Nenhum Encontrado</NotingFound>}
          closeMenuOnSelect={true}
          onChange={(val) => {
            setCampus(val)
          }}
          value={campus}
          isSearchable={true}
          classNamePrefix={'s'}
          components={{
            DropdownIndicator,
            IndicatorSeparator: () => <></>
          }}
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </label>

    </SelectCampusBox>
  );
}
export default SelectCampus;




const SelectCampusBox = styled(motion.div)`
  grid-area: campus;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  gap: 0.5rem;
  color: ${({ theme }) => theme.color.text};
  font-size: 1rem;
  z-index: 100;
  span{
    color: ${({ theme }) => theme.color.text};
    font-size: 1rem;
  }
  label{
    display: flex;
    align-items: center;
    gap: 0.5rem;
    b{
      width: 6rem;
      text-align: center;
      margin-right: 2rem;
      color:${({ theme }) => theme.color.main.light};
      font-weight: 600;
    }
  }
`

const StyledDrop = styled(components.DropdownIndicator)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  svg{

    transform: ${({ menuOpen }) => menuOpen ? `rotateX(180deg)` : `rotateX(0deg)`};
    width: 1rem;
    height: 1rem;
    fill: #fefefe;
  }
`


const Select = styled(ReactSelect)`
min-width: 9rem;
font-size: 1rem;
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
    font-size: 1rem;
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

const NotingFound = styled.small`
  font-size: 0.8rem;
  white-space: nowrap;

`