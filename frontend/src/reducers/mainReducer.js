// import {
//   USER_CLICKED_START,
//   SHOW_BILLING_SECTION
// } from "../actions/actionTypes"

const initialState = {
  // userClickedStart: false,
  // billingSectionShown: false
}

export default function(state = initialState, action) {
  // const newState = Object.assign({}, state)

  switch (action.type) {
    // case USER_CLICKED_START:
    //   newState.userClickedStart = true
    //   return newState

    // case SHOW_BILLING_SECTION:
    //   newState.billingSectionShown = true
    //   return newState

    default:
      return state
  }
}
