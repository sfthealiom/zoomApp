// auth reducer -> provider reducer
import {
  SET_APP_LANG,
  SET_LOADER,
  SET_CURRENT_USER_DATA,
  SET_ALL_DROPDOWN_DATA,
  SET_LABEL_DATA,
  STORE_JWT_TOKEN,
  STORE_ORG_ID,
  SET_PASSWORD,
  USER_LOGOUT,
} from "../actions/ActionTypes";

const INITIAL_STATE = {
  loader: false,
  staticData: {},
  labelData: {},
  appLanguage: "en",
  currentUserData: {},
  jwtToken: "",
  orgId: "",
  password: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADER:
      return { ...state, loader: action.payload };
    case SET_APP_LANG:
      return { ...state, appLanguage: action.payload };
    case SET_ALL_DROPDOWN_DATA:
      return { ...state, staticData: action.payload };
    case SET_LABEL_DATA:
      return { ...state, labelData: action.payload };
    case SET_CURRENT_USER_DATA:
      return { ...state, currentUserData: action.payload };
    case STORE_ORG_ID:
      return { ...state, orgId: action.payload };
    case STORE_JWT_TOKEN:
      return { ...state, jwtToken: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
