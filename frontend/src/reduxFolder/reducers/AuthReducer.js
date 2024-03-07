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
  SET_AUTOCOMPLETE_DIAGNOSES_DATA,
  SET_AUTOCOMPLETE_MED_DATA,
  SET_AUTOCOMPLETE_ALLERGY_DATA,
  SET_AUTOCOMPLETE_LABS_DATA,
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
  autoCompleteDataDiagnoses: [],
  autoCompleteDataMed: [],
  autoCompleteDataAllergies: [],
  autoCompleteDataLabs: [],
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
    case SET_AUTOCOMPLETE_DIAGNOSES_DATA:
      return { ...state, autoCompleteDataDiagnoses: action.payload };
    case SET_AUTOCOMPLETE_MED_DATA:
      return { ...state, autoCompleteDataMed: action.payload };
    case SET_AUTOCOMPLETE_ALLERGY_DATA:
      return { ...state, autoCompleteDataAllergies: action.payload };
    case SET_AUTOCOMPLETE_LABS_DATA:
      return { ...state, autoCompleteDataLabs: action.payload };
    case USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
