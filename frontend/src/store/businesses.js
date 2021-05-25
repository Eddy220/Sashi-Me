import { csrfFetch } from "./csrf";

// Define Action Types as Constants
const SET_BUSINESSES = 'businesses/SET_BUSINESSES';

// Define Action Creators
const setBusinesses = businesses => ({
  type: SET_BUSINESSES,
  businesses
})

// Define Thunks
export const getBusinesses = () => async (dispatch) => {
  const res = await csrfFetch('/api/businesses');
  const businesses = await res.json();
  // console.log(businesses)
  dispatch(setBusinesses(businesses));
}

// Define an initial state
const initialState = {};

// Define a reducer
const businessReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_BUSINESSES:
      const newState = {...state};
      action.businesses.forEach(business => {
        newState[business.id] = business;
      })
      return newState;
    default:
      return state;
  }
}

// Export the reducer
export default businessReducer;
