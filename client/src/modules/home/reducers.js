import {
  SET_TRAVEL_RESULTS
} from "./actions";

const initState = {
  error: false,
};

export default function homeReducer(state = initState, action) {
  switch (action.type) {
    case SET_TRAVEL_RESULTS:
        return {
          ...state,
          travelsSearched:action.payload,
          search:action.payload.search,
        }
    default:
      return state;
  }
}
