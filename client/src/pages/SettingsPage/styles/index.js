import styled, { keyframes } from 'styled-components'
import {Image as SemanticImage} from "semantic-ui-react";
import { iphone5SEMaxWidth } from '../../../components/Theme';

export const UserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: ${({theme}) => theme.cyan10};
`
export const TopInformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  width: 80%;
  height: 10%;
`
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 10%;
  height: 100%;
`
export const Icon = styled(SemanticImage)`
  display: flex;
  height: 60%;
  width: 80%;
`
export const TitleContainer = styled.div`
  display: flex;
  width: 60%;
  height: 100%; 
  align-items: center;
  justify-content: flex-end;
`
export const Title = styled.div`
  display: flex;
  color: ${({theme}) => theme.green};
  font-family: 'Avenir Next';
  font-size: 16px;

  @media (max-width: ${iphone5SEMaxWidth}px) {
      font-size: 14px;
  }
`
export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 35%;
  height: 100%;  
`
export const Image = styled(SemanticImage)`
  display: flex;
  height: 70%;
  width: 60%;
`
export const InformationsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-direction: column;
`
export const ContentInformation = styled.div`
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.gray};

  @media (max-width: ${iphone5SEMaxWidth}px) {
      font-size: 14px;
  }
`
export const HeaderInfromation = styled.div`
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 160%;
  color: ${({theme}) => theme.gray60};
`
export const InformationItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
`
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
export const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 11.15%;
  justify-content: center;
  align-items: flex-end;
`
export const InfomationsContainer = styled.div`
  display: flex;
  width: 85%;
  height: 70%;
  flex-direction: column;
  justify-content: center;
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