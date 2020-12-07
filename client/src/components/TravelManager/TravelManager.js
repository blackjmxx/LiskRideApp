import React, { Component } from "react";
import AlgoliaPlaces from "algolia-places-react";
import CalendarModal from "../../components/CalendarModal/CalendarModal";
import Moment from "moment";
import { connect } from "react-redux";
import { passphrase, cryptography } from '@liskhq/lisk-client';
import { getUser } from "../../utils/storage";
import { networkIdentifier , dateToLiskEpochTimestamp} from "../../utils";

import {
  Input,
  ToggleButtonContainer,
  IconForm,
  SecondInputContainer,
  Container,
  ButtonContainer,
  IconContainer,
  Icon
} from "../../components/common/styles";
import { api } from '../../components/Api';

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
    loading:false,
    error:{}
  };

  componentDidMount() {}

  handleChange = (value) => {
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
    this.setState({loading:true})
    const { pickUpLocation, pickUpDate, availableSeatCount, pricePerSeat, destination} = this.state;

    let registerpassphrase = passphrase.Mnemonic.generateMnemonic();
    const { address } = cryptography.getAddressAndPublicKeyFromPassphrase(registerpassphrase);
    let user = JSON.parse(getUser());
    const registerTravelTransaction = new RegisterTravelTransaction({
      asset: {
        carId : user.address,
        travelId:address,
        pickUpLocation,
        destination,
        pickUpDate,
        availableSeatCount,
        pricePerSeat
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    registerTravelTransaction.sign(user.passphrase);
    api.transactions
      .broadcast(registerTravelTransaction.toJSON())
      .then((response) => {;
        this.setState({loading:false})
        this.props.history.push("/home/travel");
      })
      .catch((err) => {
        this.setState({loading:false, error:err})
        console.log(JSON.stringify(err.errors, null, 2));
      });
  }

  render() {
    return (
      <CommonContainerView>
        {this.state.showCalendarModal && (
          <CalendarModal
            closeModal={() => this.setState({ showCalendarModal: false })}
            handleChange={(data) =>
              this.handleChange({ name: "pickUpDate", data })
            }
          ></CalendarModal>
        )}
        <Link to="/home/travel">
          <IconContainer>
            <Icon src={closeIcon} />
          </IconContainer>
        </Link>
        <Container>
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
              onError={({ message }) =>
                console.log(
                  "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
                )
              }
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
            <ToggleButtonContainer>
             LSK
            </ToggleButtonContainer>
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
              isLoading={this.state.loading}
              onClick={() => this.addTravel()}
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
  }
}

const mapActionCreators = {
}

export default connect(mapStateTopProps, mapActionCreators)(TravelManager);
