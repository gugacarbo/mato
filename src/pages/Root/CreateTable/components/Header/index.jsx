import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { ReactComponent as MatoLogo } from '../../../../../assets/logo.svg'
import SelectCampus from "./components/SelectCampus";
import SearchInput, { createFilter } from 'react-search-input'
import { AnimatePresence, motion } from "framer-motion";
import DataContext from "../../../../../context/DataContext";
import PlanContext from "../../../../../context/PlanContext";

function Header() {
  const KEYS_TO_FILTERS = ['1', '0']
  const [searchTerm, setSearchTerm] = useState("")
  const [showAll, setShowAll] = useState(false);
  const { currentCampusData } = useContext(DataContext)
  const { addToPlan } = useContext(PlanContext)
  const [openList, setOpenList] = useState(false)
  useEffect(() => {
    setShowAll(false)
  }, [searchTerm])



  let filteredList =
    currentCampusData.filter(
      createFilter(
        searchTerm,
        KEYS_TO_FILTERS
      ))

  let searchLength = filteredList.length;

  const list = !showAll ? filteredList.slice(0, 20) : filteredList

  return (
    <HeaderContainer>
      <LogoBox>
        <MatoLogo />
        <Name>
          <h1><b>MAT</b>rícula</h1>
          <h1><b>O</b>rganizada </h1>
        </Name>
      </LogoBox>
      <SearchBox
        onFocus={() => setOpenList(true)}
        onBlur={() => setTimeout(setOpenList(false), 200)}
      >
        <span>Pesquisar Matéria</span>
        <SearchInput
          placeholder="Nome ou Código" onChange={setSearchTerm} />
        <AnimatePresence>

          {openList && searchTerm &&
            <SelectList
              initial={{
                opacity: 0,
                y: "-70%"
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: "-120%"
              }}
            >
              {list.length > 0 ?
                <>
                  {
                    list.map(listItem => <SelectClass
                      onClick={() => addToPlan(listItem)}
                    ><small>{listItem[0]} - {listItem[1]}</small></SelectClass>)
                  }
                  {searchLength > 20 && !showAll && <SelectClass onClick={() => setShowAll(true)}>Ver Tudo</SelectClass>}
                </>

                : <NothingFound>Nada Encontrado</NothingFound>}
            </SelectList>
          }
        </AnimatePresence>
      </SearchBox>
      <SelectCampus />
    </HeaderContainer>
  );
}

export default Header;

const NothingFound = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.2rem 0;
`


const SelectClass = styled.button`
  width: 100%;
  color: #333;
  display: flex;
  justify-content: flex-start;
  align-items: center;  
  white-space: nowrap;
  border: none;
  border: ${({ theme }) => theme.color.main.color};
  padding: 0.3rem 0.5rem;
  overflow: hidden;
  cursor: pointer;

  &:nth-child(even){
    background-color: ${({ theme }) => theme.color.lightGray};
  }
  small{
    font-size: 0.8rem;
  }
  &:hover, &:focus{
    background-color: ${({ theme }) => theme.color.main.color};
   color: ${({ theme }) => theme.color.white};
  }
`


const SelectList = styled(motion.div)`
  position: absolute;
  min-width: 100%;
  width: 120%;
  max-width: 40rem;
  background-color: ${({ theme }) => theme.color.lightGray};
  color: ${({ theme }) => theme.color.black};
  top:calc(100% + 1rem);
  display: grid;
  grid-template-columns: auto;
  border-radius: 4px;
  font-size: 1rem;
  overflow-y: auto;
  max-height: 50vh;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.dropShadow};
  `

const SearchBox = styled.label`
display: flex;
justify-content: center;
align-items: flex-end;
margin-top: auto;
margin-bottom: 1rem;
transition:${({ theme }) => theme.transition.main};
position: relative;
width: 30%;
gap: 1rem;
span{
  white-space: nowrap;
  font-size: 1rem;
}
&:has(input:focus){
    border-color: ${({ theme }) => theme.color.main.light};
  }
  svg{
    fill: ${({ theme }) => theme.color.lightGray};
    height: 1.7rem;
    position: absolute;
    right: 0;

    cursor: pointer;
    padding: 0.4rem;
    padding-bottom: 0.3rem;
  }
input{
  
  width: 100%;
  padding: 0.2rem 0.3rem;
  border: none;
  border-bottom: 1px solid  ${({ theme }) => theme.color.white};
  outline: none;
  font-size: 1rem;
  /* background-color: ${({ theme }) => theme.color.white}; */
  background-color: transparent;
  border-radius: 3px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.white};

  &::placeholder{
    color: ${({ theme }) => theme.color.lightGray};
  }
}
`

const HeaderContainer = styled.header`
  width: 100%;
grid-area: header;

  display: flex;
  justify-content: space-between;

  padding: 1rem;

`
const LogoBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  svg{  
    padding: 0.4rem;
    padding-top: 0;
    padding-bottom: 0.6rem;
    width: 7rem;
    aspect-ratio: 1;
  }
 
`

const Name = styled.div`
  display: flex;
height: 100%;
  flex-direction: column;
  margin-top: auto;

  justify-content: space-evenly;
h1{
    font-size: 2.3rem;
    display: flex;
    align-items: center;
    font-family: 'Comfortaa';
    font-weight: 300;
    b{
      color:${({ theme }) => theme.color.main.color};
      font-weight: 600;
    }
  }
`