import styled from "styled-components";
import { ReactComponent as MatoLogo } from '../../../../../assets/logo.svg'
import CombinationsBar from "./components/CombinationsBar";
import SearchBar from "./components/SearchBar";
import SelectCampus from "./components/SelectCampus";
import PlansBar from "./components/PlansBar";
import ThemeToggler from "./components/ThemeToggler";


function Header() {
  return (
    <HeaderContainer>
      <LogoBox>
        <MatoLogo />
        <Name>
          <h1><b>MAT</b>rícula</h1>
          <h1><b>O</b>rganizada </h1>
        </Name>
      </LogoBox>
      <SearchBar />
      <PlansBar />
      <CombinationsBar />
      <SelectCampus />
      <ThemeToggler />
    </HeaderContainer>
  );
}

export default Header;



const HeaderContainer = styled.header`
  width: 100%;
  padding:0 0.8rem;
  padding-top: 0.5rem;
  grid-area: header;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  row-gap: 0.6rem;
  margin-bottom: 0.5rem;
  z-index: 2;
  grid-template-areas: 
  'logo theme  campus'
  'search plans combinations '
  ;
`
const LogoBox = styled.div`
  grid-area: logo;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-right: auto;
  svg{  
    padding: 0.4rem;
    padding-top: 0;
    padding-bottom: 0.6rem;
    width: 6rem;
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
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    font-family: 'Comfortaa';
    font-weight: 600;
    b{
      color:${({ theme }) => theme.color.main.color};
      font-weight: 600;
    }
  }
`
