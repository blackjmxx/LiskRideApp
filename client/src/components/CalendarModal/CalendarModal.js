import React from "react";
import { PopupCalendarContainer, IconContainer, Icon, ButtonContainer, PopupContentContainer } from "../RegisterPopup/style"
import { TitleContainer, Title } from "./style"
import closeIcon from '../../assets/icons/closeIcon.svg'
import { PopupViewContainer } from "../popup/style";
import '../popup/index.scss';
import './style/calendar.css'
import Calendar from 'react-calendar';

const CalendarForm = ({closeModal, handleChange, value, active}) => {
    return (
        <PopupViewContainer className={active ? 'active' : null }>
        <PopupCalendarContainer>
            <IconContainer onClick={closeModal}>
                <Icon src={closeIcon} />
            </IconContainer>
            <TitleContainer>
                <Title>
                    Date
                </Title>
            </TitleContainer>
            <PopupContentContainer>
                <Calendar
                        className='calendar'
                        onChange={handleChange}
                        value={value}
                    />
            </PopupContentContainer>
            <ButtonContainer>
                
            </ButtonContainer>
        </PopupCalendarContainer>
    </PopupViewContainer>
    );
}

export default CalendarForm
;