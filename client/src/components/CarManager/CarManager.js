import React, { Component } from "react";
import { getUser } from "../../utils/storage";
import { receiveUserLogIn, loadUserBalance } from '../../modules/settings/actions'
import {
  Input,
  SecondInputContainer,
  Container,
  ButtonContainer,
  Icon3,
  IconContainer
} from "../../components/common/styles";
import { networkIdentifier , dateToLiskEpochTimestamp} from "../../utils";
import AddAccountInfoTransaction from "../../transactions/add-account-info";
import { api } from '../../components/Api';
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import "react-calendar/dist/Calendar.css";
import "./style/calendar.css";
import { CommonContainerView } from "../common/commonContainer";
import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/closeIcon.svg";
import { FormattedMessage } from "react-intl";

import { connect } from "react-redux";

class CarManager extends Component {
  state = {
    value: new Date(),
    isLoading:false,
    carModel:undefined,
    numberPlate:undefined,
    email:undefined
  };
  componentDidMount = () => {
    let user = JSON.parse(getUser());
    if (getUser()) {
      this.props.receiveUserLogIn(JSON.parse(getUser()));
      this.props.loadUserBalance(user.address)
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCreate = () => {
    this.setState({isLoading:true});
    const {numberPlate,carModel, email} = this.state;
    let user = JSON.parse(getUser());
    const registerCarTransaction = new AddAccountInfoTransaction({
      asset: {
        carId : user.address,
        numberPlate: numberPlate || this.props.user.numberPlate,
        carModel: carModel || this.props.user.carModel,
        email: email || this.props.user.email,
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    registerCarTransaction.sign(user.passphrase);

    api.transactions
      .broadcast(registerCarTransaction.toJSON())
      .then((response) => {
        this.setState({isLoading:false});
        console.log(response.data);
      })
      .catch((err) => {
        this.setState({isLoading:false});
        console.log(JSON.stringify(err.errors, null, 2));
      });
  }

  render() {
    const email = this.state.email ||this.props.user.email;
    const numberPlate = this.state.numberPlate ||this.props.user.numberPlate;
    const carModel = this.state.carModel ||this.props.user.carModel;

    return (
      <CommonContainerView>
        <Link to="/home/params">
          <IconContainer>
            <Icon3 src={closeIcon} />
          </IconContainer>
        </Link>
        <Container>
        <SecondInputContainer>
            <Input
              name="email"
              type={"email"}
              onChange={this.handleChange}
              value={email}
              placeholder="Email"
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="numberPlate"
              type={"text"}
              onChange={this.handleChange}
              value={numberPlate}
              placeholder="Number plate"
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="carModel"
              type={"text"}
              onChange={this.handleChange}
              value={carModel}
              placeholder="Car model"
            />
          </SecondInputContainer>
          <ButtonContainer>
            <BlueButtonLoading
              isLoading={this.state.isLoading}
              onClick={() => this.handleCreate()}
            >
              <FormattedMessage id={"global.update"} />
            </BlueButtonLoading>
          </ButtonContainer>
        </Container>
      </CommonContainerView>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    error: state.home.error,
    user: state.settings.user || {},
    isValidationSucceed: state.home.isValidationSucceed,
    hasValue: state.home.hasValue,
  };
};

const mapActionCreators = {
  receiveUserLogIn,
  loadUserBalance
}

export default connect(mapStateTopProps, mapActionCreators)(CarManager);
