import { csrfFetch } from './csrf';

// Define Action Types as Constants
const SET_REVIEWS = 'reviews/SET_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';

// Define Action Creators
const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
})

const addOneReview = review => ({
  type: ADD_REVIEW,
  review
})

// Define Thunks
export const getReviews = () => async (dispatch) => {
  const res = await csrfFetch('/api/reviews');
  const reviews = await res.json();
  dispatch(setReviews(reviews))
}

export const createReview = (data) => async (dispatch) => {
  const res = await csrfFetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const review = await res.json();
    dispatch(addOneReview(review));
    return review;
  }
}

// Define an initial state
const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case SET_REVIEWS:
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    case ADD_REVIEW:
      newState = {...state};
      newState[action.review.id] = action.review;
      return newState;
    default:
      return newState;
  }
}

// Export the reducer
export default reviewReducer;
