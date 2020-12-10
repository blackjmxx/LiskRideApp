import React, { Component } from "react";
import { passphrase, cryptography } from '@liskhq/lisk-client';
import LoginTab from "./LoginTab/LoginTab";
import RegisterTab from "./RegisterTab/RegisterTab";
import {
  ErrorContainer,
  ErrorInformationContent
} from "../../../components/common/styles";

import "./styles.css";
import { LoginRegisterHeader } from "../../../components/LoginRegisterHeader/LoginRegisterHeader";
import {LoginViewContainer, BottomLoginContainer, LoginContainer, IconContainer, WarningIcon, WarningImageContainer, WarningText, WarningContentContainer, PersonIcon } from "./style";

import MenuBar from '../../../components/MenuBar/Menubar';
import warningIcon from '../../../assets/icons/warningIcon.svg';
import personImg from '../../../assets/images/person.svg';
import { FormattedMessage } from 'react-intl';

class LoginForm extends Component {
  tabs = [
    { menuItem: <FormattedMessage id={"paramsPage.login"} />,  render: props => <LoginTab {...props} /> },
    { menuItem: <FormattedMessage id={"paramsPage.register"} />, render: props => <RegisterTab {...props} /> }
  ];

  constructor(props) {
    super(props);
    this.state = {
      registeraddress: "",
      loginaddress: "",
      publicKey: "",
      registerpassphrase: "",
      loginpassphrase: "",
      activeTab: this.tabs[0].menuItem,
      showRegisterModal: false,
    };
  }

  handleRegister = () => {
    const { registeraddress, registerpassphrase }  = this.state;
    if (!registeraddress || !registerpassphrase) {
      return this.props.displayError({ message: "Missing field(s)" });
    }
    this.props.logIn(registerpassphrase, this.props.history);
  };
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    const { loginpassphrase } = this.state;

    if (!loginpassphrase) {
      return this.props.displayError({ message: "Missing field(s)" });
    }
    
    this.props.logIn(loginpassphrase, this.props.history);
  };

  handleForgotPassword = () => {
    this.props.history.push('/home/forgotPassword');
  }

  createPassPhrase = () => {
    let registerpassphrase = passphrase.Mnemonic.generateMnemonic();
    const { address, publicKey } = cryptography.getAddressAndPublicKeyFromPassphrase(registerpassphrase);
    this.setState({ registerpassphrase, registeraddress:address, publicKey })
  }

  isLoginTabActive = () => this.state.activeTab === this.tabs[0].menuItem

  changeTab = (activeTab) => this.setState({ activeTab });

  componentDidMount() {
    if (this.props.moveToRegister) {
      this.setState({
        activeTab: this.tabs[1].menuItem
      })
    }
  }

  render() {
    const { error, isLoadingUser } = this.props;
    
    return (
      <>
      <LoginRegisterHeader tabs={this.tabs} changeTab={this.changeTab} activeTab={this.state.activeTab} />
      <LoginViewContainer>
      { this.isLoginTabActive()
      ?
      <LoginContainer>
        <IconContainer>
          <WarningIcon src={warningIcon} />
        </IconContainer>
        <WarningContentContainer>
          <WarningText><FormattedMessage id={"paramsPage.bannerMessagePart2"} /></WarningText>
        </WarningContentContainer>
        <WarningImageContainer>
          <PersonIcon src={personImg}/>
        </WarningImageContainer>
      </LoginContainer>
      :
      null}
      <ErrorContainer>
        <ErrorInformationContent>
          {error && error.message}
        </ErrorInformationContent>
      </ErrorContainer>
      { this.isLoginTabActive() ?
        <>
          <LoginTab
              loading={isLoadingUser}
            handleRegister={this.handleRegister}
            handleLogin={this.handleLogin}
            handleChange={this.handleChange}
            loginaddress={this.state.loginaddress}
            loginpassphrase={this.state.loginpassphrase} />
        </>
        :
        <RegisterTab
        loading={isLoadingUser}
        handleRegister={this.handleRegister}
        handleLogin={this.handleLogin}
        handleChange={this.handleChange}
        registeraddress={this.state.registeraddress}
        registerpassphrase={this.state.registerpassphrase} 
        createPassPhrase={this.createPassPhrase}/>
       }
      <BottomLoginContainer>
      </BottomLoginContainer>
      </LoginViewContainer>
      <MenuBar/>
      </>
    );
  }
}

export default LoginForm;
