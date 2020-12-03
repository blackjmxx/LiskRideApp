import styled from "styled-components";
import {Image as SemanticImage} from "semantic-ui-react";

export const TitleContainer = styled.div`
    width: 85%;
    height: 18%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
export const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 15%;
`
export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 60%;
`
export const Image = styled(SemanticImage)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 82%;
    height: 67%;
`
export const AnimatedImage = styled(SemanticImage)`
@keyframes ping {
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
    50% {
      -webkit-transform: scale(0.9);
              transform: scale(0.9);
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
  }
    display: flex;
    justify-content: center;
    align-items: center;
    width: 82%;
    height: 67%;
    -webkit-animation: ping 1s ease-in-out infinite alternate both;
    animation: ping 1s ease-in-out infinite alternate both;
`