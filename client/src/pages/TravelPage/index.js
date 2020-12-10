import React, { Component } from "react";
import Menubar from "../../components/MenuBar/Menubar";
import { api } from "../../components/Api";
import personImg from "../../assets/images/person.svg";
import StartTavelTransaction from "../../transactions/start-travel";
import { networkIdentifier , dateToLiskEpochTimestamp} from "../../utils";
import { Redirect } from "react-router-dom";
import GlobalRequireAuth from "../../pages/SettingsPage/GlobalRequireAuth";
import Avatar from 'react-avatar';

import {
  TravelContainer,
  WarningText,
  WarningContentContainer,
  PersonIcon,
  WarningImageContainer,
} from "../SettingsPage/LoginForm/style";
import { getUser } from "../../utils/storage";
import { connect } from "react-redux";
import TravelModal from "../../components/TravelModal/TravelModal";

import {
  GiftItemContainer,
  GiftImageContainer,
  GiftItemContentContainer,
  TimeoutContentContainer,
  ItemsContainer,
  NotificationsViewContainer
} from "../../components/common/styles";

import { Content, Title } from "../../components/NotificationItem/style";

import "./styles/index.scss";

import { FormattedMessage } from "react-intl";
class TravelPage extends Component {
  state = {
    startDate: new Date(),
    newTravel: undefined,
    mytravels: [],
    showTravelModal:false,
    selectedTravel:-1,
    isLoading:false,
    errors:[],
    isTravelStartSucceed:false
  };

  todayNotifications = [
    {
      title: `You've won a free donut`,
      content: "Locals Coffee",
    },
    {
      title: `You've won a free donut`,
      content: "Locals Coffee",
    },
    {
      title: `You've won a free donut`,
      content: "Locals Coffee",
    },
  ];

  componentDidMount() {
    
    let user = JSON.parse(getUser());
    if (!user) {
      return (<Redirect to={'/home/params'}/>)
    }
    this.setState({isLoading:true})

    api.accounts
      .get({ address: user.address })
      .then((response) => {
        this.setState({ mytravels: response.data[0].asset.passengerTravels || [], isLoading:false});
      })
      .catch((err) => {
        this.setState({isLoading:false})
        console.log(JSON.stringify(err.errors, null, 2));
      });
  }

  handleOpenTravelModal = (id, travelIndex) => {
    this.setState({selectedTravel:travelIndex, showTravelModal:true, errors:[], isTravelStartSucceed:false})
  }
  
  handleTravelAction= () => {
    
    this.setState({isLoading:true})
    let user = JSON.parse(getUser());
    const { mytravels, selectedTravel } = this.state;
    
    const startTavelTransaction = new StartTavelTransaction({
      asset: {
        passengerId : user.address,
        travelId:mytravels[selectedTravel].asset.travelId,
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    startTavelTransaction.sign(user.passphrase);
    api.transactions
      .broadcast(startTavelTransaction.toJSON())
      .then((response) => {
        this.setState({isLoading:false, isTravelStartSucceed:true})
      })
      .catch((err) => {
        if(!Array.isArray(err.errors)){
          this.setState({ isLoading: false, errors: [err] });
        } else {
          this.setState({ isLoading: false, errors: err.errors });
        }
      });
  }


  render() {
    const { mytravels, selectedTravel, isLoading , isTravelStartSucceed} = this.state;
    const errors = this.state.errors.map((e, index) => <p key={index}>{e.message}</p>);
    return (
      <GlobalRequireAuth {...this.props}>
      <NotificationsViewContainer>
        {this.state.showTravelModal && (
          <TravelModal
            closeModal={() => this.setState({ showTravelModal: false })}
            travel={mytravels[selectedTravel]}
            handleAction={this.handleTravelAction}
            isLoading={isLoading}
            errors={errors}
            isTravelStartSucceed={isTravelStartSucceed}
          ></TravelModal>
          )}
          <ItemsContainer>
              <TravelContainer>
                <WarningContentContainer>
                  <WarningText>
                    <FormattedMessage id={"paramsPage.titleTravel"} />
                  </WarningText>
                </WarningContentContainer>
                <WarningImageContainer>
                  <PersonIcon src={personImg} />
                </WarningImageContainer>
              </TravelContainer>
            {mytravels.map((travel, i) => (
              <GiftItemContainer key={i}
               onClick={() => this.handleOpenTravelModal(travel.asset.travelId, i)}
              >
                <GiftImageContainer>
                <Avatar size='45px' name={travel.asset.pickUpLocation + " " + travel.asset.destination} />
                </GiftImageContainer>
                <GiftItemContentContainer>
                  <Title>
                    {travel.asset.destination} {"-->"} {travel.asset.pickUpLocation}{" "}
                  </Title>
                  <Content><b>Price per seat:{travel.asset.pricePerSeat} LSK</b></Content>
                  <TimeoutContentContainer>
                    <Content>Start - {travel.asset.pickUpDate}</Content>
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

export default connect(mapStateTopProps, null)(TravelPage);
