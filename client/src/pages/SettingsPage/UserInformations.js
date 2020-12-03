import React , { Component }from "react";
import { FormattedMessage } from 'react-intl';
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import { LogoutPopup } from "../../components/LogoutPopup/LogoutPopup";
import { BlueButton } from "../../components/common/styles";
import {
  InformationContainer,
  IconContainer,
  ItemsContainer
} from "../SettingsPage/LoginForm/style";

import { UserInfoContainer } from "../../components/common/styles";
import { removeUser } from '../../utils/storage';
import {
  UserInformationContainer,
  TitleContainer,
  TopInformationContainer,
  Title,
  ImageContainer,
  Image,
  Icon,
  InfomationsContainer,
  InformationsContainer,
  HeaderInfromation,
  InformationItemContainer,
  ContentInformation,
  BottomContainer,
  ButtonContainer,
} from "./styles";

import doneIcon from "../../assets/icons/doneIcon.svg";
import personGreen from "../../assets/images/personGreen.svg";

class Informations extends Component {
    state = {
      showLogoutModal: false
    };

    handleLogout = () => {
      if (!this.state.showLogoutModal) {
        this.setState({ showLogoutModal: true });
        return;
      }
      this.props.history.push("/home/params");
      this.setState({ showLogoutModal: false });
      removeUser()
    };
  
    render() {
      const user = this.props.user || {};
      
      return (
        <>
          {this.state.showLogoutModal && (
            <LogoutPopup
              closeModalHandler={() => this.setState({ showLogoutModal: false })}
              handleLogout={this.handleLogout}
            />
          )}
          <InformationsContainer>
            <InformationItemContainer>
            <HeaderInfromation><FormattedMessage id={"paramsPage.address"} /></HeaderInfromation>
              <ContentInformation>
               {user.address}
              </ContentInformation>
            </InformationItemContainer>
            <InformationItemContainer>
              <HeaderInfromation><FormattedMessage id={"paramsPage.email"} /></HeaderInfromation>
              <ContentInformation>{user.email}</ContentInformation>
            </InformationItemContainer>
            <InformationItemContainer>
              <HeaderInfromation><FormattedMessage id={"paramsPage.numberPlate"} /></HeaderInfromation>
              <ContentInformation>{user.numberPlate}</ContentInformation>
            </InformationItemContainer>
            <InformationItemContainer>
              <HeaderInfromation><FormattedMessage id={"paramsPage.carModel"} /></HeaderInfromation>
              <ContentInformation>{user.carModel}</ContentInformation>
            </InformationItemContainer>
            <InformationItemContainer>
              <HeaderInfromation><FormattedMessage id={"paramsPage.balance"} /></HeaderInfromation>
              <ContentInformation>{user.balance}</ContentInformation>
            </InformationItemContainer>
          </InformationsContainer>
          <BottomContainer>
            <ButtonContainer>
              <BlueButton onClick={this.handleLogout}><FormattedMessage id={"paramsPage.logOut"} /></BlueButton>
            </ButtonContainer>
          </BottomContainer>
        </>
      );
    }
  }

const UserInformations = (props) => {
    return (  
      <UserInformationContainer>
      <TopInformationContainer>
        <IconContainer>
          <Icon src={doneIcon} />
        </IconContainer>
        <TitleContainer>
          <Title><FormattedMessage id={"paramsPage.progressSaved"} /></Title>
        </TitleContainer>
        <ImageContainer>
          <Image src={personGreen} />
        </ImageContainer>
      </TopInformationContainer>
      <UserInfoContainer>
      <ItemsContainer>
      <InformationContainer>
              <BlueButtonLoading
                  color={'#F1C310'}
                  onClick={() => props.history.push('/home/car/manage')}
                >
                  <FormattedMessage id={"paramsPage.manageAccount"} />
            </BlueButtonLoading>
        </InformationContainer>
      </ItemsContainer>
      </UserInfoContainer>
      <InfomationsContainer>
        <Informations {...props} />
      </InfomationsContainer>
    </UserInformationContainer>
    );
  }

  export default UserInformations;