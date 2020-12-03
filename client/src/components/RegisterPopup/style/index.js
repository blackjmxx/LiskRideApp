import styled from "styled-components";
import {Image as SemanticImage} from "semantic-ui-react";
import { iphone5SEMaxWidth } from "../../Theme";

export const PopupContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 87%;
    height: 50%;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0 2px 32px rgba(50, 146, 255, 0.2);
    border-radius: 12px;
    opacity: 1;
`

export const PopupCalendarContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 87%;
    height: auto;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0 2px 32px rgba(50, 146, 255, 0.2);
    border-radius: 12px;
    opacity: 1;
`

export const Image = styled(SemanticImage)`
    display: flex;
    height: 25%;
    width: 60%;
    justify-content: center;
    align-items: center;
`

export const ImageSquare = styled(SemanticImage)`
    display: flex;
    height: 64px;
    width: 64px;
    justify-content: center;
    align-items: center;
`

export const PopupContentContainer = styled.div`
    display: flex;
    width: 80%;
    height: 10%;
    align-items: center;
    justify-content: center;
`
export const Text = styled.div`
    margin-top: 2%;
    font-family: 'Avenir Next';
    font-size: 14px;
    text-align: center;
    color: ${({theme}) => theme.gray80};

    @media (max-width: ${iphone5SEMaxWidth}px) {
        margin-top: 0;
        font-size: 12px;
    }
`
export const ButtonContainer = styled.div`
    display: flex;
    height: 14.5%;
    width: 80%;
`
export const Icon = styled(SemanticImage)`
    width: 100%;
    height: 100%;
    display: flex;
`
export const IconContainer = styled.div`
    display: flex;
    position: absolute;
    top: 15px;
    right: 15px;
    height: 8%;
    width: 8%;
    justify-content: center;
    align-items: center;
`