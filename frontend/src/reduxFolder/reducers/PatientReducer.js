import { SET_PATIENT_UID, SET_PATIENT_USER_DATA } from "../actions/ActionTypes";

const INITIAL_STATE = {
  patientUid: "",
  patientUserData: {},
};

const patientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PATIENT_UID:
      return { ...state, patientUid: action.payload };
    case SET_PATIENT_USER_DATA:
      return { ...state, patientUserData: action.payload };
    default:
      return state;
  }
};

export default patientReducer;
