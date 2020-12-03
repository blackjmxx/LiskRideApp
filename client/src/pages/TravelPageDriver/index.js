import React, { Component } from "react";
import Menubar from "../../components/MenuBar/Menubar";
import { api } from "../../components/Api";
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import GlobalRequireAuth from "../../pages/SettingsPage/GlobalRequireAuth";
import {
  InformationContainer,
} from "../SettingsPage/LoginForm/style";
import { getUser } from "../../utils/storage";
import { connect } from "react-redux";
import Avatar from 'react-avatar';

import {
  GiftItemContainer,
  GiftImageContainer,
  GiftItemContentContainer,
  TimeoutContentContainer,
  ItemsContainer,
  NotificationsViewContainer,
} from "../../components/common/styles";

import { Content, Title } from "../../components/NotificationItem/style";

import "./styles/index.scss";

import { FormattedMessage } from "react-intl";

class TravelPageDriver extends Component {
  state = {
    startDate: new Date(),
    newTravel: undefined,
    mytravels: [],
  };

  componentDidMount() {
    let user = JSON.parse(getUser());
    if(user){
      this.setState({isLoading:true})

      api.accounts
        .get({ address: user.address })
        .then((response) => {
          this.setState({ mytravels: response.data[0].asset.driverTravels || []});
        })
        .catch((err) => {
          console.log(JSON.stringify(err.errors, null, 2));
        });
    }
  }

  handleOpenTravelModal = (id, travelIndex) => {
    this.props.history.push("/home/travel/"+id);
  }

  goTo = () => {
    this.props.history.push('/home/travel/manage')
  }

  render() {
    const { mytravels } = this.state;
    return (
      <GlobalRequireAuth {...this.props}>
        <NotificationsViewContainer>
          <ItemsContainer>
              <InformationContainer>
              <BlueButtonLoading
                  color={'#F1C310'}
                  onClick={() => this.goTo()}
                >
                  <FormattedMessage id={"paramsPage.manageTravel"} />
                </BlueButtonLoading>
              </InformationContainer>
            {mytravels.map((travel, i) => (
              <GiftItemContainer key={i}
              onClick={() => {this.handleOpenTravelModal(travel.travelId, i)}}
              >
                <GiftImageContainer>
                  <Avatar size='45px' name={travel.pickUpLocation + " " + travel.destination} />
                </GiftImageContainer>
                <GiftItemContentContainer>
                  <Title>
                    {travel.pickUpLocation}{"-->"}{travel.destination}{" "}
                  </Title>
                  <Content><b>Price:{travel.pricePerSeat} LSK</b></Content>
                  <TimeoutContentContainer>
                    <Content>Start - {travel.pickUpDate}</Content>
                  </TimeoutContentContainer>
                  <TimeoutContentContainer>
                    <Content>Booked - {!travel.travelPassengerBalances ? 0 : travel.travelPassengerBalances.length}</Content>
                  </TimeoutContentContainer>
                </GiftItemContentContainer>
              </GiftItemContainer>
            ))}
          </ItemsContainer>
        </NotificationsViewContainer>
        <Menubar />
      </GlobalRequireAuth>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    user: state.settings.user,
  };
};

export default connect(mapStateTopProps, null)(TravelPageDriver);
