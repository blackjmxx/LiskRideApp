import React from "react";
import { PopupViewContainer } from "../popup/style";
import { FormattedMessage } from "react-intl";
import {
  TextSubTitle,
  PopupContent,
  PopupContainer,
  ButtonContainer,
} from "../LogoutPopup/style";//todo
import {
  BlueButton,
  SecondInputContainer
} from "../../components/common/styles";
import { Select } from "semantic-ui-react";
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";

import "../popup/index.scss";

const BookModal = ({
  closeModal,
  handleAction,
  active,
  availableSeatCount,
  handleChangeSeatCount,
  isBookingLoading,
  driverAddress
}) => {

const options = []

 for (let index = 0; index < parseInt(availableSeatCount, 10); index++) {
     let newindex = index + 1;
     let key = newindex.toString();
     options.push({ key: key, value: key, text: key })
 }

  return (
    <PopupViewContainer className={active ? "active" : null}>
      <PopupContainer>
        <PopupContent>
          <TextSubTitle>
              Book travel with driver:{driverAddress}
          </TextSubTitle> 
        </PopupContent>
        <SecondInputContainer>
            Seat count :
            <Select placeholder='Select your country' options={options} onChange={handleChangeSeatCount}/>
        </SecondInputContainer>

        <ButtonContainer>
          <BlueButtonLoading isLoading={isBookingLoading} onClick={handleAction}>
            <FormattedMessage id={"paramsPage.book"} />
          </BlueButtonLoading>
          <BlueButton onClick={closeModal}>
            {" "}
            <FormattedMessage id={"global.cancel"} />
          </BlueButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupViewContainer>
  );
};

export default BookModal;
