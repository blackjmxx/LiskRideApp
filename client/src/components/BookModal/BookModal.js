import React from "react";
import { PopupViewContainer } from "../popup/style";
import { FormattedMessage } from "react-intl";
import {
  TextSubTitle,
  PopupContent,
  PopupContainer,
  ButtonContainer,
} from "../LogoutPopup/style"; //todo
import {
  BlueButton,
  SecondInputContainer,
  ErrorContainer,
  ErrorInformationContent,
  SuccesContainer,
  SuccessInformationContent,
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
  driverAddress,
  errors,
  isBookSucceed = false,
}) => {
  const options = [];

  for (let index = 0; index < parseInt(availableSeatCount, 10); index++) {
    let newindex = index + 1;
    let key = newindex.toString();
    options.push({ key: key, value: key, text: key });
  }

  return (
    <PopupViewContainer className={active ? "active" : null}>
      <PopupContainer>
        <PopupContent>
          <TextSubTitle>Book travel with driver:{driverAddress}</TextSubTitle>
        </PopupContent>
        <ErrorContainer>
          {errors && (
            <ErrorInformationContent>{errors}</ErrorInformationContent>
          )}
          {isBookSucceed && (
            <SuccessInformationContent>
              {" "}
              <p>
                <FormattedMessage id={"book.succeed"} />
              </p>
            </SuccessInformationContent>
          )}
        </ErrorContainer>
        <SecondInputContainer>
          Seat count :
          <Select
            placeholder="Select seat number "
            options={options}
            onChange={handleChangeSeatCount}
          />
        </SecondInputContainer>

        <ButtonContainer>
          {isBookSucceed ? (
            <BlueButtonLoading
              isLoading={isBookingLoading}
              onClick={closeModal}
            >
              <FormattedMessage id={"global.close"} />
            </BlueButtonLoading>
          ) : (
            <BlueButtonLoading
              isLoading={isBookingLoading}
              onClick={handleAction}
            >
              <FormattedMessage id={"paramsPage.book"} />
            </BlueButtonLoading>
          )}
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
