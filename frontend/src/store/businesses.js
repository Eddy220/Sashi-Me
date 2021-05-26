import { csrfFetch } from "./csrf";

// Define Action Types as Constants
const SET_BUSINESSES = 'businesses/SET_BUSINESSES';
const ADD_ONE = 'businesses/ADD_ONE'
const ONE_BUSINESS = 'busnesses/ONE_BUSINESS'

// Define Action Creators
const setBusinesses = businesses => ({
  type: SET_BUSINESSES,
  businesses
})

const addOneBusiness = business => ({
  type: ADD_ONE,
  business
})

const oneBusiness = business => ({
  type: ONE_BUSINESS,
  business
})

// Define Thunks
export const getBusinesses = () => async (dispatch) => {
  const res = await csrfFetch('/api/businesses');
  const businesses = await res.json();
  // console.log(businesses)
  dispatch(setBusinesses(businesses));
}

export const getOneBusiness = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${id}`);
  const business = await res.json();
  dispatch(oneBusiness(business));
}

export const createBusiness = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/businesses', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const business = await res.json();
    dispatch(addOneBusiness(business));
    return business;
  }
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
    case ADD_ONE: {
      if(!state[action.business.id]) {
        const newState = {
          ...state,
          [action.business.id]: action.business
        }
        return newState;
      }
      return {
        ...state,
        [action.business.id]: {
          ...state[action.business.id],
          ...action.business,
        }
      }
    }
    case ONE_BUSINESS:
      const singleState = {...state};
      singleState[action.business.id] = action.business;
      return singleState;
    default:
      return state;
  }
}

// Export the reducer
export default businessReducer;
