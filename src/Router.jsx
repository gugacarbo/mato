import { Router } from 'preact-router';
import Div100vh from 'react-div-100vh';
import styled from 'styled-components';


import Root from "./pages/Root";

function RouterProvider() {

  return (
    <Container>
      <Router>
        <Root path="" />
      </Router>
    </Container>
  );
}

export default RouterProvider;


const Container = styled(Div100vh)`
  width: 100vw;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`