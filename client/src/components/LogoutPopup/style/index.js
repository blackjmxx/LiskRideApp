import styled from "styled-components";

export const PopupContainer = styled.div`    
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 87%;
    height: 36%;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0 2px 32px rgba(50, 146, 255, 0.2);
    border-radius: 12px;
    padding:2%;
`

export const LogoutPopupCalendar = styled.div`    
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 87%;
    height: auto%;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0 2px 32px rgba(50, 146, 255, 0.2);
    border-radius: 12px;
`
export const PopupContent = styled.div`
    display: flex;
    width: 80%;
    height: 50%;
    align-items: center;
    justify-content: center;
`
export const Text = styled.div`
    font-family: 'Avenir Next';
    line-height: 28px;
    font-size: 20px;
    text-align: center;
    color: ${({theme}) => theme.gray};
`

export const TextSubTitle = styled.div`
    font-family: 'Avenir Next';
    line-height: 28px;
    font-size: 16px;
    text-align: center;
    color: ${({theme}) => theme.gray};
`

export const ButtonContainer = styled.div`
    display: flex;
    height: 20%;
    width: 80%;
`