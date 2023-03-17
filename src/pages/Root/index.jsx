import styled from "styled-components";
import Div100vh from "react-div-100vh"
import { useContext } from 'react'
import { AnimatePresence } from "framer-motion";
import DataContext from "../../context/DataContext";
import SelectCampus from "./SelectCampus";
import CreateTable from "./CreateTable";


function Root() {
  const { campus } = useContext(DataContext)
  return (
    <Container>
      <AnimatePresence mode="popLayout">
        {JSON.stringify(campus) == "{}" ? <SelectCampus key="Scamp" /> : <CreateTable key="CTbl" />}
      </AnimatePresence>
    </Container>
  );
}
export default Root;




const Container = styled(Div100vh)`
  width: 100vw;
  max-height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`


