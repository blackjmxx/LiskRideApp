import React, { Component } from "react";
import AlgoliaPlaces from "algolia-places-react";
import CalendarModal from "../../components/CalendarModal/CalendarModal";
import Moment from "moment";
import { connect } from "react-redux";
import { passphrase, cryptography } from "@liskhq/lisk-client";
import { getUser } from "../../utils/storage";
import { networkIdentifier, dateToLiskEpochTimestamp } from "../../utils";

import {
  Input,
  ToggleButtonContainer,
  IconForm,
  SecondInputContainer,
  Container,
  ButtonContainer,
  IconContainer,
  Icon,
  ErrorContainer,
  ErrorInformationContent
} from "../../components/common/styles";
import { api } from "../../components/Api";

import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import RegisterTravelTransaction from "../../transactions/register-travel";

import "react-calendar/dist/Calendar.css";
import "./style/calendar.css";
import { CommonContainerView } from "../common/commonContainer";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import calendar from "../../assets/icons/calendar.svg";
import seat from "../../assets/icons/seat.svg";
import closeIcon from "../../assets/icons/closeIcon.svg";

const date = new Date();

class TravelManager extends Component {
  state = {
    departure: undefined,
    pickUpLocation: undefined,
    pickUpDate: date,
    availableSeatCount: 0,
    pricePerSeat: 0,
    value: new Date(),
    showCalendarModal: false,
    isLoading: false,
    errors: [],
    errorLocation:undefined,
  };

  componentDidMount() {}

  handleChange = (value) => {
    this.setState({errorLocation:undefined})
    if (value.name === "destination" || value.name === "pickUpLocation") {
      this.setState({ [value.name]: value.data.suggestion.name });
      return;
    }
    if (value.name === "pickUpDate") {
      this.setState({ [value.name]: Moment(value.data).format("MM-DD-YYYY") });
      return;
    }
    this.setState({ [value.target.name]: value.target.value });
  };

  addTravel = () => {
    const {
      pickUpLocation,
      pickUpDate,
      availableSeatCount,
      pricePerSeat,
      destination,
    } = this.state;

    if(!destination){
      this.setState({errorLocation:"destination"})
      return
    }
    if(!pickUpLocation ){
      this.setState({errorLocation:"pick Up Location"})
      return
    }
    this.setState({ isLoading: true });
    let registerpassphrase = passphrase.Mnemonic.generateMnemonic();
    const { address } = cryptography.getAddressAndPublicKeyFromPassphrase(
      registerpassphrase
    );
    let user = JSON.parse(getUser());
    const registerTravelTransaction = new RegisterTravelTransaction({
      asset: {
        carId: user.address,
        travelId: address,
        pickUpLocation,
        destination,
        pickUpDate,
        availableSeatCount,
        pricePerSeat,
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    registerTravelTransaction.sign(user.passphrase);
    api.transactions
      .broadcast(registerTravelTransaction.toJSON())
      .then((response) => {
        this.setState({ isLoading: false });
        this.props.history.push("/home/travel");
      })
      .catch((err) => {
        this.setState({ isLoading: false, errors: err.errors });
      });
  };

  render() {
    const errors = this.state.errors.map((e, index) => <p key={index}>{e.message}</p>);

    return (
      <CommonContainerView>
        {this.state.showCalendarModal && (
          <CalendarModal
            handleChange={(data) => {
              this.handleChange({ name: "pickUpDate", data });
              this.setState({ showCalendarModal: false });
            }}
          ></CalendarModal>
        )}
        <Link to="/home/travel">
          <IconContainer>
            <Icon src={closeIcon} />
          </IconContainer>
        </Link>
        <Container>
        { this.state.errorLocation && <ErrorContainer>
          <ErrorInformationContent>
            <b><FormattedMessage id={"travel.onlyFrance"} />: {this.state.errorLocation}</b> 
          </ErrorInformationContent>
        </ErrorContainer>}
        { this.state.errors && <ErrorContainer>
          <ErrorInformationContent>
            {errors}
          </ErrorInformationContent>
        </ErrorContainer>}
          <SecondInputContainer>
            <AlgoliaPlaces
              key="destinationId"
              placeholder="Destination"
              name={"destination"}
              options={{
                appId: "plEXDWG96G11",
                apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                language: "fr",
                countries: ["fr"],
                type: "city",
              }}
              onChange={(data) =>
                this.handleChange({ name: "destination", data: data })
              }
              onClear={() => this.handleChange({ name: "destination", data: {suggestion:{name:undefined}}})}
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <AlgoliaPlaces
              key="pickUpLocationId"
              placeholder="Pick up location"
              name={"pickUpLocation"}
              options={{
                appId: "plEXDWG96G11",
                apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                language: "fr",
                countries: ["fr"],
                type: "city",
              }}
              onChange={(data) =>
                this.handleChange({ name: "pickUpLocation", data: data })
              }
              onClear={() => this.handleChange({ name: "pickUpLocation", data: {suggestion:{name:undefined}}})}
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              as="button"
              onClick={() => this.setState({ showCalendarModal: true })}
              name="pickupdate"
              value={Moment(this.state.pickUpDate).format("MM-DD-YYYY")}
              placeholder="pick up date"
            />
            <ToggleButtonContainer>
              <IconForm src={calendar} />
            </ToggleButtonContainer>
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="pricePerSeat"
              type={"number"}
              onChange={this.handleChange}
              value={this.state.pricePerSeat}
              placeholder="Price per seat"
            />
            <ToggleButtonContainer>LSK</ToggleButtonContainer>
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="availableSeatCount"
              type={"number"}
              max={6}
              onChange={this.handleChange}
              value={this.state.availableSeatCount}
              placeholder="Seat count"
            />
            <ToggleButtonContainer>
              <IconForm src={seat} />
            </ToggleButtonContainer>
          </SecondInputContainer>
          <ButtonContainer>
            <BlueButtonLoading
              isLoading={this.state.isLoading}
              onClick={this.addTravel}
            >
              <FormattedMessage id={"global.addTravel"} />
            </BlueButtonLoading>
          </ButtonContainer>
        </Container>
      </CommonContainerView>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    user: state.settings.user,
  };
};

const mapActionCreators = {};

export default connect(mapStateTopProps, mapActionCreators)(TravelManager);
