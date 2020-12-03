import React, { Component } from "react";
import { getUser } from "../../utils/storage";

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
  };
  componentDidMount() {}

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCreate = () => {
    const {numberPlate,carModel, email} = this.state;
    // check email
    let user = JSON.parse(getUser());
    const registerCarTransaction = new AddAccountInfoTransaction({
      asset: {
        carId : user.address,
        numberPlate,
        carModel,
        email
      },
      networkIdentifier: networkIdentifier,
      timestamp: dateToLiskEpochTimestamp(new Date()),
    });

    registerCarTransaction.sign(user.passphrase);

    api.transactions
      .broadcast(registerCarTransaction.toJSON())
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err.errors, null, 2));
      });
  }

  render() {
    debugger
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
              value={this.state.email}
              placeholder="Email"
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="numberPlate"
              type={"text"}
              onChange={this.handleChange}
              value={this.state.numberPlate}
              placeholder="Number plate"
            />
          </SecondInputContainer>
          <SecondInputContainer>
            <Input
              name="carModel"
              type={"text"}
              onChange={this.handleChange}
              value={this.state.carModel}
              placeholder="Car model"
            />
          </SecondInputContainer>
          <ButtonContainer>
            <BlueButtonLoading
              isLoading={this.state.loading}
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
    isValidationSucceed: state.home.isValidationSucceed,
    hasValue: state.home.hasValue,
  };
};

const mapActionCreators = {
};

export default connect(mapStateTopProps, mapActionCreators)(CarManager);
