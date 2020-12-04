import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AlgoliaPlaces from "algolia-places-react";
import Notifications from "../Notifications";
import Menubar from "../MenuBar/Menubar";
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import calendar from "../../assets/icons/calendar.svg";
import seat from "../../assets/icons/seat.svg";
import car from "../../assets/icons/car.svg";
import Moment from "moment";
import _ from "lodash";
import CalendarModal from "../../components/CalendarModal/CalendarModal";
import "./styles/custom.css"
import { CommonContainerView } from "../common/commonContainer";
import {
  Input,
  ButtonContainer,
  SecondInputContainer,
  Container,
  ToggleButtonContainer,
  IconForm,
  SecondInputContainer2,
  ImageContainer,
  Image,
} from "../../components/common/styles";

import GlobalRequireAuth from "../../pages/SettingsPage/GlobalRequireAuth";
import { FormattedMessage, injectIntl } from "react-intl";

class HomePage extends Component {
  state = {
    departure: undefined,
    pickUpLocation: undefined,
    pickUpDate: new Date(),
    availableSeatCount: 0,
    pricePerSeat: 0,
    travels:[],
    showCalendarModal: false,
    isLoading:false
  };
  handleForm = () => {    
    const {
      destination,
      pickUpLocation,
      pickUpDate,
      availableSeatCount,
    } = this.state;

    const travels = [];

    this.setState({isLoading:true})
    let destinationP = fetch(
      `https://lisk-ride.com/api/accounts?asset=destination&contains=${destination}`
    );
    let pickUpLocationP = fetch(
      `https://lisk-ride.com/api/accounts?asset=pickUpLocation&contains=${pickUpLocation}`
    );
    let pickUpDateP = fetch(
      `https://lisk-ride.com/api/accounts?asset=pickUpDate&contains=${pickUpDate}`
    );

    var search = {
      availableSeatCount,
      pickUpDate,
      pickUpLocation,
      destination
    };

    Promise.all([
      destinationP,
      pickUpLocationP,
      pickUpDateP,
    ])
      .then((values) => {
        let promises = [];
        values.forEach((value) => {
          promises.push(value.json());
        });
        Promise.all(promises).then((values) => {
          values.forEach((value) => {
            console.log(value);
            
            value.data.forEach((v) => travels.push({travelId:v.id, carId:v.carId,...v.asset}));
          });
          
          const filter = {pickUpDate, pickUpLocation, destination}

          let results = travels.filter(function(item) {
            for (var key in filter) {
              if (item[key] === undefined || item[key] !== filter[key])
                return false;
            }
            return true;
          });
          this.setState({isLoading:false})
          
          let uniquResult = _.uniqBy(results, 'travelId');
          this.props.updateTravels({travels:uniquResult, search})         
          this.props.history.push("/home/results");
        });
      })
      .catch((reason) => {
        this.setState({isLoading:false})
        console.log(reason);
      });
  };

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

  componentDidMount = () => {};

  render() {
    const { error } = this.props;
    if (error) {
      return <Redirect to="/404" />;
    }
    return (
      <>
        <GlobalRequireAuth {...this.props}>
        <CommonContainerView>
          {this.state.showCalendarModal && (
          <CalendarModal
            closeModal={() => this.setState({ showCalendarModal: false })}
            handleChange={(data) =>
              this.handleChange({ name: "pickUpDate", data })
            }
          ></CalendarModal>
          )}
            <Notifications />
            <ImageContainer>
                <Image src={car} />
              </ImageContainer>
            <Container>

              <SecondInputContainer2>
                <AlgoliaPlaces
                  key="destinationId"
                  placeholder="Destination"
                  name={"destination"}                  
                  options={{
                    appId: "plEXDWG96G11",
                    apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                    language: "fr",
                    countries: ["fr"],
                    type: "city"
                  }}
                  onChange={(data) =>
                    this.handleChange({ name: "destination", data: data })
                  }
                />
              </SecondInputContainer2>
              <SecondInputContainer2>
                <AlgoliaPlaces
                  key="pickUpLocationId"
                  placeholder="Pick up location"
                  name={"pickUpLocation"}
                  options={{
                    appId: "plEXDWG96G11",
                    apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                    language: "fr",
                    countries: ["fr"],
                    type: "city"
                  }}
                  onChange={(data) =>
                    this.handleChange({ name: "pickUpLocation", data: data })
                  }
                />
              </SecondInputContainer2>
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
                  name="availableSeatCount"
                  type={"number"}
                  max={6}
                  onChange={this.handleChange}
                  value={this.state.availableSeatCount}
                />
                <ToggleButtonContainer>
                  <IconForm src={seat} />
                </ToggleButtonContainer>
              </SecondInputContainer>

              <ButtonContainer>
                <BlueButtonLoading
                  isLoading={this.state.isLoading}
                  onClick={() => this.handleForm()}
                >
                  <FormattedMessage id={"global.search"} />
                </BlueButtonLoading>
              </ButtonContainer>
            </Container>
          </CommonContainerView>
          <Menubar />
        </GlobalRequireAuth>
      </>
    );
  }
}


export default injectIntl(HomePage);
