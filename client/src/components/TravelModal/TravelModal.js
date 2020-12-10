import React from "react";
import { PopupViewContainer } from "../popup/style";
import { FormattedMessage } from "react-intl";
import {
  PopupContent,
  PopupContainer,
  ButtonContainer,
  TextSubTitle,
} from "../../components/LogoutPopup/style";
import {
  BlueButton,
  ErrorContainer,
  ErrorInformationContent,
  SuccessInformationContent,
} from "../../components/common/styles";
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import "../popup/index.scss";
import "./style/calendar.css";

const TravelModal = ({
  closeModal,
  handleAction,
  active,
  travel,
  isLoading,
  errors,
  isTravelStartSucceed,
}) => {
  return (
    <PopupViewContainer className={active ? "active" : null}>
      <PopupContainer>
        <PopupContent>
          <TextSubTitle>
            Start travel with driver:{travel.asset.carId}
          </TextSubTitle>
        </PopupContent>
        <ErrorContainer>
          {errors && (
            <ErrorInformationContent>{errors}</ErrorInformationContent>
          )}
          {isTravelStartSucceed && (
            <SuccessInformationContent>
              {" "}
              <p>
                <FormattedMessage id={"travel.startSucceed"} />
              </p>
            </SuccessInformationContent>
          )}
        </ErrorContainer>
        <ButtonContainer>
          {isTravelStartSucceed ? (
            <BlueButtonLoading isLoading={isLoading} onClick={closeModal}>
              <FormattedMessage id={"global.close"} />
            </BlueButtonLoading>
          ) : (
            <BlueButtonLoading isLoading={isLoading} onClick={handleAction}>
              <FormattedMessage id={"global.yes"} />
            </BlueButtonLoading>
          )}

          <BlueButton onClick={closeModal}>
            {" "}
            <FormattedMessage id={"global.no"} />
          </BlueButton>
        </ButtonContainer>
      </PopupContainer>
    </PopupViewContainer>
  );
};

export default TravelModal;
