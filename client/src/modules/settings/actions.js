import { setUser } from "../../utils/storage";
import { cryptography } from '@liskhq/lisk-client';
import { api } from '../../components/Api';

export const FETCH_USERPROFILE_REQUEST = "FETCH_USERPROFILE_REQUEST";
export const FETCH_USERPROFILE_SUCCESS = "FETCH_USERPROFILE_SUCCESS";
export const FETCH_USERPROFILE_FAILURE = "FETCH_USERPROFILE_FAILURE";
export const RECEIVE_USER_LOG_IN = "RECEIVE_USER_LOG_IN";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";


const fetchUserProfileRequest = () => {
  return { type: FETCH_USERPROFILE_REQUEST };
};

const fetchUserProfileFailure = error => {
  return { type: FETCH_USERPROFILE_FAILURE, error: error };
};

export const receiveUserLogIn = (user = {}) => {
  return { type: RECEIVE_USER_LOG_IN, user };
};

export const receiveUserData = (data = {balance:'0', numberPlate:'', carModel:''}) => {
  return { type: RECEIVE_USER_DATA, data };
};

export const logIn = (passphraselogin, history) => {
  return dispatch => {
    dispatch(fetchUserProfileRequest());
      try {
        const { publicKey, address } =  cryptography.getAddressAndPublicKeyFromPassphrase(passphraselogin)
        const account = { passphrase: passphraselogin, publicKey, address }
        dispatch(receiveUserLogIn(account));
        setUser(JSON.stringify(account))
        history.push("/home");
      } catch (error) {
        dispatch(fetchUserProfileFailure(error))
      }
  };
};

export const loadUserBalance = (address) => {
  return dispatch => {
      api.accounts.get({address: address})
        .then((response) => {
          dispatch(receiveUserData({balance:response.data[0].balance, numberPlate:response.data[0].asset.numberPlate, carModel:response.data[0].asset.carModel}));
        })
        .catch((err) => {
          console.log(err)
        });
  };
};

export const displayError = err => {
  return dispatch => {
    dispatch(fetchUserProfileFailure(err));
  };
};
