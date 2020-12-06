import React, { useEffect, useRef } from 'react';
import { TermsPoliciesLink, RegisterInputsContainer, InputRegister, ButtonContainer, InputRegisterContainer, SecondInputRegisterContainer } from '../../../../components/common/styles'
import { FormattedMessage } from 'react-intl';
import BlueButtonLoading from "../../../../components/Buttons/BlueButtonLoading";

const RegisterTab = props => {

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
        isFirstRun.current = false;
        props.createPassPhrase()
        return;
    }
  })

  return (
  <>
    <RegisterInputsContainer>
      <SecondInputRegisterContainer>
        <InputRegister
            name='registerpassphrase'
            type={'text'}
            onChange={props.handleChange}
            value={props.registerpassphrase}
            placeholder="Passphrase"
            />
      </SecondInputRegisterContainer>
      <InputRegisterContainer>
        <InputRegister
            name='registeraddress'
            onChange={props.handleChange}
            value={props.registeraddress}
            placeholder="Address"/>
      </InputRegisterContainer>
      <ButtonContainer>
        <TermsPoliciesLink>
          <FormattedMessage id={"paramsPage.agreementText"} />
        </TermsPoliciesLink>
      </ButtonContainer>
      <ButtonContainer>
        <BlueButtonLoading isLoading={props.loading} onClick={() => props.handleRegister()}>
          {
            <FormattedMessage id={"global.register"} />
          }
        </BlueButtonLoading>
      </ButtonContainer>
      </RegisterInputsContainer>
  </>
  );
};

export default RegisterTab;
