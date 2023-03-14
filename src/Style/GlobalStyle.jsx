import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html{
        font-size: 16px;
    }

    //* BreakPoints

    @media (max-width: 1600px) {
        html{
            font-size: 13.5px;
        }
    }

    @media (max-width: 1440px) {
        html{
            font-size: 13px;
        }
    }

    @media (max-width: 1280px) {
        html{
            font-size: 13px;
        }
    }

    @media (max-width: 1276px) {
        html{
            font-size: 12px;
        }
    }
    
    @media (max-width: 800px) {
        html{
            font-size: 11px;
        }
    }
    
    @media (max-width: 768px) {
        html{
            font-size: 10px;
        }
    }

    @media (max-width: 620px) {
        html{
            font-size: 9px;
        }
    }


    @media (max-width: 520px) {
        html{
            font-size: 10px;
        }
    }

    @media (max-width: 414px) {
        html{
            font-size: 11px;
        }
    }
    
   
    @media (max-width: 480px) {
        html{
            font-size: 10.3px;
        }
    }
    
    @media (max-width: 380px) {
        html{
            font-size: 9.5px;
        }
    }
    
    @media (max-width: 320px) {
        html{
            font-size: 9px;
        }
    }

    @media (max-width: 280px) {
        html{
            font-size: 8px;
        }
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: ${({ theme }) => theme.color.main.color};
           
        }
        &::-webkit-scrollbar-thumb:hover {
            background-color: ${({ theme }) => theme.color.main.dark};
        }
        &::-webkit-scrollbar-thumb:active {
            background-color: ${({ theme }) => theme.color.main.darker};
        }
    }
    body {
        font-family: 'Poppins', sans-serif;
        font-family: 'Comfortaa', sans-serif;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color.white};
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
       
    }
`;
export default GlobalStyle;
