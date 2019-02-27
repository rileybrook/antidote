import {
  GET_PATIENTS,
  PATIENTS_LOADING,
  UPDATE_PATIENT_SEARCH_VALUE
} from "./actionTypes"
import { serverAddress } from "../config"

export const updatePatientSearchValue = value => {
  return {
    type: UPDATE_PATIENT_SEARCH_VALUE,
    value
  }
}

export const getPatients = filter => async dispatch => {
  dispatch(setItemsLoading())

  if (!filter) filter = ""

  let payload = []
  try {
    const response = await fetch(serverAddress + "/patient/search", {
      method: "POST",
      body: JSON.stringify({ filter })
    })

    payload = JSON.parse(await response.text()).patients
    // console.log(payload)
  } catch (err) {
    payload = []
    console.log(err)
  } finally {
    dispatch({
      type: GET_PATIENTS,
      payload: payload
    })
  }
}

export const setItemsLoading = () => {
  return {
    type: PATIENTS_LOADING
  }
}
