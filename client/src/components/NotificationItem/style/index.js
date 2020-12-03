import styled from 'styled-components'

export const NotificationItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    flex: 1;
    margin: 6px 0;
    flex-direction: column;
    background-color: ${({theme}) => theme.menuBarBg};
    box-shadow: 0px 0px 6px rgba(50, 146, 255, 0.15);
    border-radius: 8px;
`
export const ItemContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    justify-content: center;
    padding-left: 15px;
`
export const Title = styled.div`
    font-family: 'Avenir Next';
    font-size: 14px;
    color: ${({theme}) => theme.cyan};
    font-weight: bold;
`
export const OtherTitle = styled(Title)`
    color: ${({theme}) => theme.gray};
`
export const Content = styled.div`
    font-weight: normal;
    font-size: 12px;
    color: ${({theme}) => theme.gray60};
`