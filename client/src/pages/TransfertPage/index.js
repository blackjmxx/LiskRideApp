import React, { Component } from "react";
import Menubar from "../../components/MenuBar/Menubar";
import { cryptography } from "@liskhq/lisk-client";
import BlueButtonLoading from "../../components/Buttons/BlueButtonLoading";
import {TransferTransaction, utils} from '@liskhq/lisk-transactions';
import { api } from '../../components/Api';
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getUser } from "../../utils/storage";
import {
  InformationContainer,
} from "../SettingsPage/LoginForm/style";
import {
  ItemsContainer,
  NotificationsViewContainer,
} from "../../components/common/styles";
import GlobalRequireAuth from "../../pages/SettingsPage/GlobalRequireAuth";
import "./styles/index.scss";

const networkIdentifier = cryptography.getNetworkIdentifier(
  "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  "Lisk"
);

class TransfertPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:false
    };
  }

  componentDidMount = () => {
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleTransfert = (event) => {
    this.setState({isLoading:true})
    let user = JSON.parse(getUser());

    try {
        const fundTransaction = new TransferTransaction({
            asset: {
                recipientId: user.address,
                amount: utils.convertLSKToBeddows("200"),
            },
            networkIdentifier: networkIdentifier,
        });

        fundTransaction.sign("creek own stem final gate scrub live shallow stage host concert they");
        
        api.transactions.broadcast(fundTransaction.toJSON()).then(response => {        
          this.setState({isLoading:false})
      }).catch(err => {
          this.setState({isLoading:false})
          console.log(JSON.stringify(err.errors, null, 2));
      });

    } catch (error) {
      this.setState({isLoading:false})
      console.log(error)
    }
  };

  render() {
    return (
      <GlobalRequireAuth {...this.props}>
        <NotificationsViewContainer>
          <ItemsContainer>
            <InformationContainer>
            <BlueButtonLoading
              isLoading={this.state.isLoading}
              color={'#F1C310'}
              onClick={() => this.handleTransfert()}
            >
              <FormattedMessage id={"paramsPage.faucet"} />
          </BlueButtonLoading>
            </InformationContainer>
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

export default connect(mapStateTopProps, null)(TransfertPage);
