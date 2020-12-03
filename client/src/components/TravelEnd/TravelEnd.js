import React, { Component } from "react";
import CalendarModal from "../../components/CalendarModal/CalendarModal";
import { getUser } from "../../utils/storage";
import { Rating, Button } from 'semantic-ui-react'
import EndTravelTransaction from "lisk-ride-transactions/end-travel";
import { networkIdentifier , dateToLiskEpochTimestamp} from "../../utils";

import {
  IconContainer,
  Icon,
  NotificationsViewContainer2
} from "../../components/common/styles";

import { api } from '../../components/Api';

import "react-calendar/dist/Calendar.css";
import "./style/calendar.css";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/closeIcon.svg";

import { connect } from "react-redux";

const date = new Date();

class TravelEnd extends Component {
  state = {
    departure: undefined,
    pickUpLocation: undefined,
    pickUpDate: date,
    availableSeatCount: 0,
    pricePerSeat: 0,
    value: new Date(),
    showCalendarModal: false,
    loading:false,
    error:{},
    travel:{travelDriverBalance:[]},
    ratings:{}
  };
  
  componentDidMount() {
    const { travelId } = this.props.match.params;
    if(!travelId) return
    this.setState({isLoading:true})
    api.accounts
      .get({ address: travelId })
      .then((response) => {
        this.setState({ travel: response.data[0].asset || {}});
      })
      .catch((err) => {
        console.log(JSON.stringify(err.errors, null, 2));
      });

  }

  handleRate = (e, { rating, maxRating }, passengerAddress) => { 
    this.setState({ratings:{...this.state.ratings , [passengerAddress]:rating}})
  }

  rateAndWidthDraw = (fromPassengerAdress, rating) => {
    let user = JSON.parse(getUser());
    const { travelId } = this.props.match.params;
    const { ratings, travel } = this.state;
    
    const endTravelTransaction = new EndTravelTransaction({
      asset: {
        travelId:travelId,
        passengerId:fromPassengerAdress,
        carId:travel.carId,
        rating:ratings[fromPassengerAdress]
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    endTravelTransaction.sign(user.passphrase);
    api.transactions
      .broadcast(endTravelTransaction.toJSON())
      .then((response) => {;
        console.log(response.data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.errors, null, 2));
      });
  }

  render() {
    const {travelDriverBalance = [], travelPassengerBalances = []} = this.state.travel
    return (
      <NotificationsViewContainer2>
        {this.state.showCalendarModal && (
          <CalendarModal
            closeModal={() => this.setState({ showCalendarModal: false })}
            handleChange={(data) =>
              this.handleChange({ name: "pickUpDate", data })
            }
          ></CalendarModal>
        )}
        <Link to="/home/car">
          <IconContainer>
            <Icon src={closeIcon} />
          </IconContainer>
        </Link>
          <div>
            {travelDriverBalance.map((tdb, i) => {
              return <div>
                        <div>
                          adress:{tdb.passengerAddress}
                        </div>
                        <div>
                          seatCount:{tdb.seatCount}
                        </div>
                        <div>
                        amountTravel:{tdb.amountTravel}
                        <Rating icon='star' defaultRating={tdb.rating || 0} maxRating={5}  onRate={(e, { rating, maxRating }) => this.handleRate(e, { rating, maxRating }, tdb.passengerAddress)}/>
                      </div>
                        <Button disabled={tdb.amountTravel === '0'} onClick={() => this.rateAndWidthDraw(tdb.passengerAddress)}>Rate and widthdraw</Button>
                    </div>
            })}
             {travelPassengerBalances.map((tdb, i) => {
              return <div>
                        <div>
                          User:{tdb.passengerAddress}
                        </div>
                        <div>
                          Email:{tdb.email}
                        </div>
                        <div>
                          SeatCount:{tdb.seatCount}
                        </div>
                        <div>
                          Total:{tdb.amountTravel}
                        </div>
                    </div>
            })}
          </div>
      </NotificationsViewContainer2>
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

export default connect(mapStateTopProps, mapActionCreators)(TravelEnd);
