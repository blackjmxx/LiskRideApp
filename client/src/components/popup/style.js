import styled from "styled-components";

export const PopupViewContainer = styled.div`
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: none;
    opacity: 0;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    opacity: 1;
    padding: 5%;
`