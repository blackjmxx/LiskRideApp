import styled from "styled-components";

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 5%;
`
export const Title = styled.div`
    font-family: 'Avenir Next';
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    font-weight: bold;
    color: ${({theme}) => theme.gray};

`