import styled, { keyframes } from 'styled-components'
import {Image as SemanticImage} from "semantic-ui-react";
import { Theme , iphone5SEMaxWidth} from "../../../components/Theme";

export const GiftViewContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.cyan10};
    flex-direction: column;
    align-items: center;
`
export const GiftItemContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 6px 0;
    flex-direction: row;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0px 0px 6px rgba(50, 146, 255, 0.15);
    border-radius: 8px;
`
export const GiftImageContainer = styled.div`
  display: flex;
  height: 77%;
  width: 36%;
  margin: 8px;
  align-items: center;
  justify-content: center;
`
export const GiftImage = styled(SemanticImage)`
  width: 100%;
  height: 100%;
  display: flex;
`
export const GiftItemContentContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;

    flex-direction: column;
    justify-content: flex-start;
    justify-content: center;
`
export const TimeoutContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 45%;
  width: 100%;

  padding: 0 10px 0px 0;
  justify-content: flex-end;
  align-items: flex-end;
`

export const Border = styled.div`
  margin: 0 auto;
  background-color: #000000;
  padding: 50px;
  padding-bottom: 30px;
  
  @media (min-height: 600px) {
    position: fixed;
    padding-bottom: 80px;
    bottom: 0;
    top: 0;
    right: 0;
    left: 0;
  }
`
const intro = keyframes`
0% {transform: translateY(100%)}
100% {transform: translateY(0)}
`;

const outtro = keyframes`
0% {
  transform: translateY(0);
}
100% {transform: translateY(100%);}
}
`;

export const L9Div = styled.div`
&.page-enter {
  animation-name: ${intro};
  animation-duration: 0.4s;
  animation-iteration-count: 1;
}
&.page-exit {
  animation-name: ${outtro};
  animation-duration: 0.4s;
  animation-iteration-count: 1;
}
`

export const NotificationsViewContainer = styled.div`
    display: flex;
    width: 100%;
    flex-basis: 100%;
    background-color: ${({theme}) => theme.cyan10};
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: auto;
`

export const NotificationsViewContainer2 = styled.div`
    display: flex;
    width: 100%;
    margin-top:20%;
    flex-basis: 100%;
    background-color: ${({theme}) => theme.cyan10};
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: auto;
`


export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  justify-content: flex-start;
  align-items: flex-start;
`

export const ToggleButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 20%;
    top: 0;
    right: 0;
`

export const ToggleButtonContainer2 = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 20%;
    top: 0;
    right: 0;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15%;
`

export const UserInfoContainer = styled.div`
    position: relative;
    width: 100vw;
    display: flex;
    justify-content: center;
    height: 25%;
`;


export const Icon = styled(SemanticImage)`
    display: flex;
    width: 16px;
    height: 16px;
`

export const Icon3 = styled(SemanticImage)`
    width: 100%;
    height: 100%;
    display: flex;
`

export const IconForm = styled(SemanticImage)`
    display: flex;
    width: 50%;
    height: 50%
`



export const ButtonContainer2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 45%;
`

export const Input = styled.input`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0px 0px 6px rgba(50, 146, 255, 0.15);
    border: 0 solid transparent;
    border-radius: 30px;
    padding: 0;
    margin: 0;
    padding-left: 15px;
    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${({theme}) => theme.gray60};
        font-family: 'Avenir Next';
        font-size: 16px;
    }
`

export const LoginInputsContainer3 = styled.div`
    display: flex;
    width: 85%;
    height: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FirstInputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 22%;
    margin-bottom: 7%;
`

export const SecondInputContainer = styled(FirstInputContainer)`
    margin-bottom: 5;
    position: relative;
`

export const SecondInputContainer2 = styled(FirstInputContainer)`
    margin-bottom: 5;
    position: relative;
    width:100%;
`

export const Container = styled.div`
    display: flex;
    width: 85%;
    height: 55%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const LoginInputsContainer2 = styled.div`
    display: flex;
    width: 85%;
    height: 40%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const title = {
    order: 1,
    fontFamily: 'Avenir Next',
    fontSize: '20px',
    lineHeight: '28px',
    textAlign: 'center',
    color: Theme.gray80,
    height: 'auto',
    fontWeight: 'bold',
};

export const buttonContent = {
    fontFamily: 'Avenir Next',
    lineHeight: '140%',
    fontSize: '24px',
    display: 'flex',
    textAlign: 'center',
}

export const description = {
    fontFamily: 'Avenir Next',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    color: Theme.gray80,
};



export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;  
`
export const Image = styled(SemanticImage)`
  display: flex;
  height: 80%;
  width: 80%;
`
export const TopInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  width: 50%;
  height: 50%;
`

export const InputRegister = styled.input`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0px 0px 6px rgba(50, 146, 255, 0.15);
    border: 0 solid transparent;
    border-radius: 30px;
    padding: 0;
    margin: 0;
    padding-left: 15px;
    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${({theme}) => theme.gray60};
        font-family: 'Avenir Next';
        font-size: 16px;
    }
`
export const TermsPoliciesLink = styled.div`
    font-family: 'Avenir Next';
    font-size: 16px;
    text-align: center;
    color: ${({theme}) => theme.gray};
`
export const RegisterInputsContainer = styled.div`
    display: flex;
    width: 85%;
    height: 60%;
    margin-top: 6.8%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

export const InputRegisterContainer = styled.div`
    display: flex;
    width: 100%;
    height: 15%;
    margin-bottom: 7%;
`

export const SecondInputRegisterContainer = styled(InputRegisterContainer)`
    position: relative;
`

export const BlueButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({color}) => color === undefined ? "#3292FF" : color};
    box-shadow: 0px 0px 6px rgba(50, 146, 255, 0.15);
    border-radius: 50px;
    font-family: 'Avenir Next';
    font-size: 16px;
    color: ${({theme}) => theme.menuBarBg};
    text-align: center;
    font-weight: bold;
    letter-spacing: 0;
    width: ${({size}) => size === 'small' ? "50%" : "100%"};
    margin: 0.5%;
    height: ${({size}) => size === 'small' ? "50%" : "100%"};
    &:focus {
        background-color: ${({theme}) => theme.blue};
    }
    
    .loader {
        &:after {
            border-color: #fff transparent transparent!important;
        }
        &:before {
            border: none!important;
        }
    }
    
    &[disabled] {
      pointer-events: none;
      opacity: 0.7;
    }

    @media (max-width: ${iphone5SEMaxWidth}px) {
        font-size: 14px;
    }
`

export const Icon2 = styled(SemanticImage)`
    display: flex;
    width: 50%;
    height: 50%
`

export const IconContainer = styled.div`
    display: flex;
    position: absolute;
    top: 6px;
    left: 15px;
    height: 7%;
    width: 7%;
    justify-content: center;
    align-items: center;
`