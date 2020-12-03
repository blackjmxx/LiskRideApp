import React from "react";
import { PopupViewContainer } from "../popup/style";
import { FormattedMessage } from 'react-intl';
import { PopupContent, PopupContainer, ButtonContainer , TextSubTitle} from "../../components/LogoutPopup/style";
import { BlueButton } from '../../components/common/styles'
import '../popup/index.scss';
import './style/calendar.css'

const TravelModal = ({closeModal, handleAction, active, Title, travel}) => {
    return (
        <PopupViewContainer className={active ? 'active' : null }>
         <PopupContainer>
                <PopupContent>
                    <TextSubTitle>
                        Start travel with driver:{travel.asset.carId}
                    </TextSubTitle> 
                </PopupContent>
                <ButtonContainer>
                    <BlueButton onClick={handleAction}><FormattedMessage id={"global.yes"} /></BlueButton>
                    <BlueButton onClick={closeModal}> <FormattedMessage id={"global.no"} /></BlueButton>
                </ButtonContainer>
            </PopupContainer>
    </PopupViewContainer>
    );
}

export default TravelModal;