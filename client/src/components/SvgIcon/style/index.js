import styled from "styled-components";

export const Icon = styled.svg`
    display: flex;
    width: 20px;
    height: 20px;
    
`
export const ActiveIcon = styled(Icon)`
    path {
        fill: ${({theme}) => theme.cyan};
    }
`

export const IconDot = {
    backgroundColor: '#c70039',
    borderRadius: '50%',
    height: 12,
    width: 12,
    position: 'absolute',
    top: -5,
    right: -5,
}