import { csrfFetch } from "./csrf";

// Define Action Types as Constants
const SET_BUSINESSES = 'businesses/SET_BUSINESSES';
const ADD_ONE = 'businesses/ADD_ONE'
const ONE_BUSINESS = 'busnesses/ONE_BUSINESS'
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS'
const UPDATE_BUSINESS = 'businesses/UPDATE_BUSINESS'

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

const deleteOneBusiness = businessId => ({
  type: DELETE_BUSINESS,
  businessId
})

const updateBusiness = businessId => ({
  type: UPDATE_BUSINESS,
  businessId
})

// Define Thunks
export const getBusinesses = () => async (dispatch) => {
  const res = await fetch('/api/businesses');
  const businesses = await res.json();
  // console.log(businesses)
  dispatch(setBusinesses(businesses));
}

export const getOneBusiness = (id) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${id}`);
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

export const editBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId.businessId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(businessId)
  })
    const updatedBusiness = await res.json();
    dispatch(updateBusiness(updatedBusiness.businessUpdate));
    return updatedBusiness.businessUpdate;
}

export const deleteBusiness = (businessId) => async (dispatch) => {
  const res = await csrfFetch(`/api/businesses/${businessId}`, {
    method: 'DELETE',
    body: JSON.stringify({businessId})
  })
  if (res.ok) {
    dispatch(deleteOneBusiness(businessId));
    console.log('hello')
    return res;
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
    case DELETE_BUSINESS:
      const prevState = {...state}
      delete prevState[action.businessId]
      return prevState;
    // case ONE_BUSINESS:
    //   const singleState = {...state};
    //   singleState[action.business.id] = action.business;
    //   return singleState;
    case UPDATE_BUSINESS:
      // if(!state[action.business.id]) {
        const updateState = {
          ...state,
          [action.businessId.id]: action.businessId
        }
        return updateState;
      // return {
      //   ...state,
      //   [action.business.id]: {
      //     ...state[action.business.id],
      //     ...action.business,
      //   }
      // }
    default:
      return state;
  }
}

// Export the reducer
export default businessReducer;
