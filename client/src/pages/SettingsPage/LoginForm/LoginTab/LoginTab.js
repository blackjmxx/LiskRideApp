import React, { useState } from "react";
import {
  Input,
  ButtonContainer,
  Container,
  FirstInputContainer,
  SecondInputContainer,
  Icon,
  ToggleButtonContainer2,
} from "../../../../components/common/styles";
import eyeShowIcon from "../../../../assets/icons/eyeShowIcon.svg";
import eyeHideIcon from "../../../../assets/icons/eyeHideIcon.svg";
import { FormattedMessage } from "react-intl";
import BlueButtonLoading from "../../../../components/Buttons/BlueButtonLoading";

const LoginTab = (props) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
      <Container>
        <SecondInputContainer>
          <Input
            name="loginpassphrase"
            type={showPassword ? "password" : "text"}
            onChange={props.handleChange}
            value={props.loginpassphrase}
            placeholder="Passphrase"
          />
          {showPassword ? (
            <ToggleButtonContainer2
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon src={eyeShowIcon} />
            </ToggleButtonContainer2>
          ) : (
            <ToggleButtonContainer2
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon src={eyeHideIcon} />
            </ToggleButtonContainer2>
          )}
        </SecondInputContainer>
        <FirstInputContainer>
          <Input
            name="loginaddress"
            onChange={props.handleChange}
            value={props.loginaddress}
            placeholder="Address"
          />
        </FirstInputContainer>
        <ButtonContainer>
          <BlueButtonLoading
            isLoading={props.loading}
            onClick={() => props.handleLogin()}
          >
            <FormattedMessage id={"global.login"} />
          </BlueButtonLoading>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default LoginTab;
