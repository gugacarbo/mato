import styled from "styled-components";
import { useContext } from 'react'
import DataContext from "../../context/DataContext";
import SelectCampus from "./SelectCampus";
import CreateTable from "./CreateTable";
import { AnimatePresence, motion } from "framer-motion";

import { ReactComponent as LogoSvg } from '../../assets/logo.svg'
function Root() {
  const { campus, map } = useContext(DataContext)
  return (
    <AnimatePresence mode="popLayout">
      {
        !map?.createDate ?
          <Loading key="Load" /> :
          JSON.stringify(campus) == "{}" ?
            <SelectCampus key="Scamp" /> :
            <CreateTable key="CTbl" />
      }
    </AnimatePresence>
  );
}
export default Root;

const Loading = () => {
  return (
    <LogoBox
      initial={{
        scale: 1,
        opacity: 1
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        duration: 0.8,
      }}
    >
      <Logo />
    </LogoBox>)
}
const LogoBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 10;
  pointer-events: none;
 
`
const Logo = styled(LogoSvg)`
  max-height: 30%;
  max-width: 30%;
`
