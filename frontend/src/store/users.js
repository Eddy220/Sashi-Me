import { csrfFetch } from './csrf';

// Define Action Types as constants
const SET_USERS = '/users/SET_USERS';

// Define Action Creators
const setUsers = users => ({
  type: SET_USERS,
  users:users
})

// Define thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch('/api/users')

  if (res.ok) {
    const users = await res.json();
    dispatch(setUsers(users));
  }
}

// Define an initial state
const initialState = {};

const userReducer = (state = initialState, action) => {
  let newState = {...state}
  switch(action.type) {
    case SET_USERS: {
      newState = {...state}
      action.users.forEach(user => {
        newState[user.id] = user
      })
      return newState
    }
    default:
      return newState;
  }
}

export default userReducer;
