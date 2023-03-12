import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "./components/Header";
import SelectedSubject from "./components/SelectedSubject";
import WeekCalendar from "./components/WeekCalendar";


function CreateTable() {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <WeekCalendar />
      <SelectedSubject />
    </Container>
  );
}
export default CreateTable;


const Container = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 1297px;
  display: grid;
  grid-template-rows : auto 1fr ;
  grid-template-columns : 60% 40% ;
  grid-template-areas: 
    'header header'
    'table list'
  ;
  overflow: hidden;
  row-gap: 1rem;
`

