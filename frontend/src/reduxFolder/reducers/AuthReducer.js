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
  SET_AUTOCOMPLETE_PROC_DONE_DATA,
  SET_ENCOUNTER_CALL_DETAILS,
  SET_AI_PREDS,
  SET_TRIAGE_AI_SUGGESTION,
  SET_VITALS,
  SET_AI_SUGGESTION_NOTES,
  SET_ALL_TRANSCRIPT,
  SET_CC,
  SET_WEBSOCKET_AI_PREDS,
  SET_ENCOUNTER_NOTES,
  SET_MEETING_ID,
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
  autoCompleteProcDone: [],
  encounterCallDetails: {},
  aiPreds: [],
  triageAiSuggestions: {
    diagnoses: [],
    medications: [],
    procedures: [],
    procedures_done: [],
  },
  vitals: {
    bpm: "",
    oxygen: "",
    rr: "",
    stressStatus: "",
    systolic: "",
    hrv: "",
  },
  aiSuggestions: {
    diagnoses: [],
    medications: [],
    procedures: [],
    procedures_done: [],
  },
  allTranscript: "",
  transcriptMessageCount: 0,
  closedCaptions: "",
  webSocketAiPreds: {},
  encounter_notes: {
    subjective_clinical_summary: null,
    ai_predictions: true,
    patient_location: null,
    diagnoses: [],
    diagnoses_comments: null,
    medications: [],
    medication_comments: null,
    generic_medication: null,
    lab_imaging: [],
    lab_imaging_comments: null,
    procedures: [],
    procedures_done: [],
    procedure_comments: null,
    referal_data: [],
    referal_comment: null,
    follow_up: {},
    follow_up_comments: null,
    patient_education: {},
    care_task_directives: null,
    comment: null,
  },
  meetingId: "",
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
    case SET_AUTOCOMPLETE_PROC_DONE_DATA:
      return { ...state, autoCompleteProcDone: action.payload };
    case USER_LOGOUT:
      return INITIAL_STATE;
    case SET_ENCOUNTER_CALL_DETAILS:
      return {
        ...state,
        encounterCallDetails: action.payload,
      };
    case SET_AI_PREDS:
      return { ...state, aiPreds: action.payload };
    case SET_TRIAGE_AI_SUGGESTION:
      return { ...state, triageAiSuggestions: action.payload };
    case SET_VITALS:
      return { ...state, vitals: action.payload };
    case SET_AI_SUGGESTION_NOTES:
      return { ...state, aiSuggestions: action.payload };
    case SET_ALL_TRANSCRIPT:
      return {
        ...state,
        allTranscript: action.payload.transcript,
        transcriptMessageCount: action.payload.count,
      };
    case SET_CC:
      return { ...state, closedCaptions: action.payload };
    case SET_WEBSOCKET_AI_PREDS:
      return { ...state, webSocketAiPreds: action.payload };
    case SET_ENCOUNTER_NOTES:
      return { ...state, encounter_notes: action.payload };
    case SET_MEETING_ID:
      return { ...state, meetingId: action.payload };
    default:
      return state;
  }
};

export default authReducer;
