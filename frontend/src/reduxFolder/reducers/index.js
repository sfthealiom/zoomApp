import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import patientReducer from "./PatientReducer";

export default combineReducers({
  authReducer: authReducer,
  patientReducer: patientReducer,
});
