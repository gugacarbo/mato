import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import PlanContext from "../../../../../../../context/PlanContext";
import { useState, useContext, useEffect } from "react";
import DataContext from "../../../../../../../context/DataContext";
import { createFilter } from 'react-search-input'
import { ReactComponent as SearchIcon } from '../../../../../../../assets/search.svg'




function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAll, setShowAll] = useState(false);
  const KEYS_TO_FILTERS = ['1', '0', '2']

  const { addToPlan } = useContext(PlanContext)
  const [openList, setOpenList] = useState(false)
  const { currentCampusData } = useContext(DataContext)


  // const [excludeSearch, setExcludeSearch] = useState([])

  useEffect(() => {
    setShowAll(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [searchTerm])

  let filteredList =
    currentCampusData.filter(
      createFilter(
        searchTerm,
        KEYS_TO_FILTERS
      ))


  let searchLength = filteredList.length;

  const list = !showAll ? filteredList.slice(0, 20) : filteredList


  return (<SearchBox
    onFocus={() => setOpenList(true)}
    onBlur={() => setTimeout(setOpenList(false), 200)}
  >
    <span>Pesquisar Matéria</span>
    <input
      placeholder="Nome ou Código"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value)
      }} />
    <SearchIcon />
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
                list.map((listItem, i) => <SelectClass
                  key={`cl${i}`}
                  onClick={() => addToPlan(listItem)}
                ><small>{listItem[0]} - {listItem[1]}</small></SelectClass>)
              }
              {searchLength > 20 && !showAll && <SelectClass onClick={() => setShowAll(true)}>Ver Tudo</SelectClass>}
            </>

            : <NothingFound>Nada Encontrado</NothingFound>}
        </SelectList>
      }
    </AnimatePresence>
  </SearchBox>);
}

export default SearchBar;

const SearchBox = styled.label`

grid-area: search;
z-index:5;

display: flex;
justify-content: center;
align-items: center;
margin-top: auto;
background-color: ${({ theme }) => theme.backgroundMedium};
/* border: 0.5px solid ${({ theme }) => theme.color.main.medium}77;
 */
box-shadow: 1px 1px 4px -0px ${({ theme }) => theme.color.main.light}8d;

&:has(input:focus){
  box-shadow: 1px 1px 4px -0px ${({ theme }) => theme.color.main.color};
}
padding: 0.3rem 0.8rem;
border-radius: 5px;
font-size: 0.9rem;
transition:${({ theme }) => theme.transition.main};
position: relative;
width: 100%;
max-width: 380px;
gap: 0.5rem;
margin-left: 0.6rem;
span{
  white-space: nowrap;
  font-size: 0.9rem;
}
svg{
    fill: ${({ theme }) => theme.textLight};
    height: 1.6rem;
    right: 0.6rem;
    transition:${({ theme }) => theme.transition.main};
    
    pointer-events: none;
    /* position: absolute; */
    /* padding: 0.4rem;
    padding-bottom: 0.3rem; */
  }

&:has(input:focus){
    border-color: ${({ theme }) => theme.color.main.light};
    svg{
    fill: ${({ theme }) => theme.color.main.color};
      
    }
  }
  
input{
  width: 100%;
  padding: 0.1rem 0.3rem;
  border: none;
  border-bottom: 1.5px solid  ${({ theme }) => theme.color.main.light};
  outline: none;
  font-size: 0.9rem;
  /* background-color: ${({ theme }) => theme.color.white}; */
  background-color: transparent;
  /* border-radius: 3px; */
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  
  &::placeholder{
    color: ${({ theme }) => theme.color.lightGray}aa;
    color: ${({ theme }) => theme.color.main.lighter}9a;
  }
}
`

const SelectList = styled(motion.div)`
  position: absolute;
  left: 0;
  min-width: 10rem;
  width: 100%;
  max-width: 40rem;
  background-color: ${({ theme }) => theme.color.lightGray};
  color: ${({ theme }) => theme.color.black};
  top:calc(100% + 1rem);
  display: grid;
  grid-template-columns: auto;
  border-radius: 4px;
  font-size: 1rem;
overflow: hidden;
  
  overflow-y: auto;
  max-height: 50vh;
  z-index: 10;

  box-shadow: ${({ theme }) => theme.dropShadow};
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

const NothingFound = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.2rem 0;
`