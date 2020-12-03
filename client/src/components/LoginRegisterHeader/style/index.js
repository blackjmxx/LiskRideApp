import styled from "styled-components";

export const LoginRegisterHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: 10%;
    background-color: ${({theme}) => theme.menuBarBg};
    flex-direction: row;
`
export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 50%;
`
export const ButtonActive = styled(Button)`
    border-bottom: 4px solid #3292FF;
`
export const ContentTextActive = styled.div`
    font-family: 'Avenir Next';
    font-weight: bold;
    font-size: 16px;
    line-height: 140%;
    color: ${({theme}) => theme.cyan};
    text-align: center;
`

export const ContentTextDefault = styled(ContentTextActive)`
    color: ${({theme}) => theme.gray60};
    border-bottom: 0px, solid transparent;
`