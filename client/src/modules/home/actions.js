export const SET_TRAVEL_RESULTS =
  "SET_TRAVEL_RESULTS";

export function setTravelsResults(payload = {}) {
  return {
    type: SET_TRAVEL_RESULTS,
    payload: payload
  };
}

export const updateTravels = (travels = [], search = {}) => {
  return dispatch => {
    dispatch(setTravelsResults(travels, search));
  }
}