import styled from "styled-components";

export const Title = styled.div`
    font-family: 'Avenir Next';
    color: ${({theme}) => theme.gray60};
    display: flex;
    align-items: center;
    text-align: center;
    padding-top: 1.5vw;
`
export const ActiveTitle = styled(Title)`
    color: ${({theme}) => theme.cyan};
`
export const menuBarStyle = {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    border: 0,
    boxShadow: 'none',
    marginTop: 0,
    minHeight: '10%',
    maxHeight: '10%',
    width: '100vw',
    left: 0,
    paddingLeft: '10px', 
    paddingRight: '10px', 
    bottom: 0,
}

export const MenuLinkStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'1px'
}