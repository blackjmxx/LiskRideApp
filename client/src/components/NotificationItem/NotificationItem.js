import React from "react";
import { NotificationItemContainer, ItemContentContainer, Title, Content, OtherTitle } from "./style";

export const NotificationItem = ({earlierNotification, title, content}) => {
    return (
        <NotificationItemContainer>
            <ItemContentContainer>
                {earlierNotification 
                ? <OtherTitle>{title}</OtherTitle> 
                : <Title>{title}</Title> }
                <Content>{content}</Content>
            </ItemContentContainer>
        </NotificationItemContainer>
    )
}