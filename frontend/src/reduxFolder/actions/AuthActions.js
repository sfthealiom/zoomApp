/* globals zoomSdk */
import axios from "axios";
import { configSecret } from "../../assets/awsSecrets";
import {
  SET_APP_LANG,
  SET_CURRENT_USER_DATA,
  SET_LOADER,
  SET_PASSWORD,
  SET_PATIENT_UID,
  SET_PATIENT_USER_DATA,
  STORE_JWT_TOKEN,
  STORE_ORG_ID,
  USER_LOGOUT,
  SET_HISTORY_LIST,
  SET_SEL_HISTORY_DATA,
  SET_ENCOUNTER_CALL_DETAILS,
  SET_AI_PREDS,
  SET_TRIAGE_AI_SUGGESTION,
  SET_VITALS,
  SET_AI_SUGGESTION_NOTES,
  SET_ALL_TRANSCRIPT,
  SET_CC,
  SET_WEBSOCKET_AI_PREDS,
  SET_ENCOUNTER_NOTES,
} from "./ActionTypes";
import { setToSessionStore } from "../CommonFunctions";
import { getUserToken } from "../CommonActions";

const { API_URL, AI_SERVER } = configSecret;

export const setAppLang = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_APP_LANG,
      payload: value,
    });
  };
};

const invokeZoomAppsSdk = (api) => async () => {
  const { name, buttonName = "", options = null } = api;
  const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk);

  const response = await zoomAppsSdkApi(options);
  return response;
};

export const setJWTToken = (value) => {
  return async (dispatch) => {
    dispatch({
      type: STORE_JWT_TOKEN,
      payload: value,
    });
  };
};

export const setPassword = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_PASSWORD,
      payload: value,
    });
  };
};

export const setAiSuggestionNotes = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SET_AI_SUGGESTION_NOTES,
      payload: data,
    });
  };
};

export const setAllTranscript = (transcript, count) => {
  console.log(count, "this is countcountcount");
  return (dispatch) => {
    dispatch({
      type: SET_ALL_TRANSCRIPT,
      payload: { transcript: transcript, count: count + 1 },
    });
  };
};

export const setCC = (cc) => {
  return (dispatch) => {
    dispatch({
      type: SET_CC,
      payload: cc,
    });
  };
};

export const setWebSocketAiPreds = (aiPreds, currentAiPreds) => {
  return (dispatch) => {
    var newAIPreds = currentAiPreds;
    if (
      aiPreds?.subjectiveClinicalSummary &&
      aiPreds?.subjectiveClinicalSummary?.length
    ) {
      newAIPreds["subjectiveClinicalSummary"] =
        aiPreds?.subjectiveClinicalSummary;
    }

    if (
      aiPreds?.objectiveClinicalSummary &&
      aiPreds?.objectiveClinicalSummary?.length
    ) {
      newAIPreds["objectiveClinicalSummary"] =
        aiPreds?.objectiveClinicalSummary;
    }
    if (aiPreds?.clinicalAssessment && aiPreds?.clinicalAssessment?.length) {
      newAIPreds["clinicalAssessment"] = aiPreds?.clinicalAssessment;
    }
    if (aiPreds?.carePlanSuggested && aiPreds?.carePlanSuggested?.length) {
      newAIPreds["carePlanSuggested"] = aiPreds?.carePlanSuggested;
    }
    console.log(aiPreds, "ksadhjfakshlfjafdhljfhakljds");
    dispatch({
      type: SET_WEBSOCKET_AI_PREDS,
      payload: aiPreds,
    });
  };
};

export const submitEncounterNote = (
  jwtAuthToken,
  updateData,
  organization_id,
  he_type,
  navigate,
  meetingId
) => {
  return (dispatch) => {
    const header = {
      Authorization: "Bearer " + jwtAuthToken,
      organization_id: organization_id,
      he_type: he_type,
    };
    var url = API_URL + "/encounter_note";

    var new_notes = JSON.parse(JSON.stringify(updateData.encounter_note));
    var abrMap = {
      quantity_unit: "",
      route: "",
      frequency: "",
      dispense_unit: "",
      refills: "",
      generic: "",
      days_supply: "",
      substitutions_allowed: "",
    };
    if (new_notes.medications) {
      var temp_medications = new_notes.medications.map((item) => {
        var temp_item = {
          code: item.code,
          dispense_unit: item.dispense_unit,
          display: item.display,
          frequency: item.frequency,
          quantity_unit: item.quantity_unit,
          reason: item.reason,
          refills: item.refills,
          route: item.route,
          days_supply: item.days_supply,
          status: item.status,
          suggested_ai: item.suggested_ai,
          generic: item.generic,
          substitutions_allowed: item.substitutions_allowed,
          pharmacy_notes: item.pharmacy_notes,
          alternative_pharmacy_id: item?.alternative_pharmacy_id,
          estimated_rtpb_pay_amount: item?.estimated_rtpb_pay_amount,
          is_alternative: item?.is_alternative,
          original_med_code: item?.original_med_code,
          original_med_name: item?.original_med_name,
        };
        return temp_item;
      });

      new_notes.medications = temp_medications;
    }

    var config = {
      method: "POST",
      url: url,
      headers: header,
      data: {
        encounter_id: updateData.encounterid,
        encounter_note: new_notes,
      },
    };
    let apiCall = axios(config)
      .then((response) => {
        navigate("/consultation-notes");
        dispatch({ type: SET_LOADER, payload: false });
      })
      .catch((error) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const getEncounterNote = (
  jwtAuthToken,
  encounter_id,
  organization_id,
  he_type,
  edit_key
) => {
  return async (dispatch) => {
    var header = {
      Authorization: "Bearer " + jwtAuthToken,
      organization_id: organization_id,
      he_type: he_type,
    };
    const url = API_URL + "/get_encounter_notes?encounter_id=" + encounter_id;
    let apiCall = axios
      .get(url, { headers: header })
      .then((response) => {
        if (response.data.length !== 0) {
          var temp_notes = JSON.parse(JSON.stringify(response.data));
          var abrMap = {
            quantity_unit: "",
            route: "",
            frequency: "",
            dispense_unit: "",
            refills: "",
            generic: "",
            days_supply: "",
            substitutions_allowed: "",
          };
          if (temp_notes.medications && edit_key) {
            var temp_medications = temp_notes.medications.map((item) => {
              const temp_item = {
                code: item.code,
                dispense_unit: item.dispense_unit
                  ? abrMap.dispense_unit + item.dispense_unit
                  : null,
                display: item.display,
                frequency: item.frequency
                  ? abrMap.frequency + item.frequency
                  : null,
                quantity_unit: item.quantity_unit
                  ? abrMap.quantity_unit + item.quantity_unit
                  : null,
                reason: item.reason,
                refills: item.refills ? abrMap.refills + item.refills : null,
                route: item.route ? abrMap.route + item.route : null,
                days_supply: item.days_supply
                  ? abrMap.days_supply + item.days_supply
                  : null,
                pharmacy_notes: item.pharmacy_notes,
                status: item.status,
                suggested_ai: item.suggested_ai,
                generic: item.generic,
                substitutions_allowed: item.substitutions_allowed,
              };
              return temp_item;
            });
            temp_notes.medications = temp_medications;
          }
          dispatch({
            type: SET_ENCOUNTER_NOTES,
            payload: temp_notes,
          });
          // if (
          //   response.data.medications &&
          //   response.data.medications.length != 0
          // ) {
          //   var tempMedicationUi = response.data.medications.map(item => {
          //     return {
          //       renderQuantity: false,
          //       renderRoute: false,
          //       renderFrequency: false,
          //       renderDispense: false,
          //       renderRefills: false,
          //       renderGeneric: false,
          //       renderFirstLine: 0,
          //       renderSecondLine: 0,
          //     };
          //   });
          //   dispatch({type: SET_MEDICATION_UI, payload: tempMedicationUi});
          // }

          // if (
          //   response.data.procedures &&
          //   response.data.procedures.length != 0
          // ) {
          //   var tempProcedureUi = response.data.procedures.map(item => {
          //     return {
          //       renderFulfil: false,
          //     };
          //   });
          //   dispatch({type: SET_PROCEDURE_UI, payload: tempProcedureUi});
          // }
        } else {
          dispatch({
            type: SET_ENCOUNTER_NOTES,
            payload: {
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
              working_diagnoses: [],
              procedure_comments: null,
              referal_data: [],
              referal_comment: null,
              follow_up: {},
              follow_up_comments: null,
              patient_education: {},
              care_task_directives: null,
              comment: null,
            },
          });
          // dispatch({type: SET_PROCEDURE_UI, payload: []});
          // dispatch({type: SET_MEDICATION_UI, payload: []});
        }
      })
      .catch((error) => {
        return error;
      });
  };
};

export const completeEncounter = (
  jwtAuthToken,
  care_request_id,
  encounterid,
  patient_msg_id,
  patientid,
  provider_msg_id,
  provider_wait_time,
  providerid,
  aiSuggestions,
  organization_id,
  he_type,
  navigate,
  encounter_notes,
  encounterCallDetails,
  meetingId
) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER, payload: true });
    const header = {
      Authorization: "Bearer " + jwtAuthToken,
      organization_id: organization_id,
      he_type: he_type,
    };

    const url = API_URL + "/completed_encounter";

    const insertData = {
      care_request_id: care_request_id,
      encounterid: encounterid,
      patient_msg_id: patient_msg_id,
      patientid: patientid,
      provider_msg_id: provider_msg_id,
      provider_wait_time: provider_wait_time,
      providerid: providerid,
      predicted_suggestions: aiSuggestions,
    };
    let apiCall = axios
      .post(url, insertData, { headers: header })
      .then((response) => {
        var updateData_temp = encounterCallDetails;
        updateData_temp["encounter_note"] = encounter_notes;
        dispatch(
          submitEncounterNote(
            jwtAuthToken,
            updateData_temp,
            organization_id,
            he_type,
            navigate,
            meetingId
          )
        );
      })
      .catch((error) => {
        console.log(error, "this is response data completed_encounter");
        dispatch({ type: SET_LOADER, payload: false });
        return error;
      });
  };
};

export const encounterStartCall = (
  jwtAuthToken,
  patientid,
  providerid,
  sessionname,
  sessionpass,
  encounter_time,
  transcript,
  encounter_note,
  care_team,
  stream_channel,
  clinical_info,
  status,
  care_request_id,
  provider_wait_time,
  organization_id,
  he_type,
  displayName,
  roleType,
  sessionIdleTimeoutMins,
  navigate,
  careReqType,
  meetingId
) => {
  return async (dispatch) => {
    var header = {
      Authorization: "Bearer " + jwtAuthToken,
      organization_id: organization_id,
      he_type: he_type,
    };
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const url = API_URL + "/encounter";
    let updateData = {
      patientid: patientid,
      providerid: providerid,
      sessionname: sessionname,
      sessionpass: sessionpass,
      encounter_time: encounter_time,
      transcript: transcript,
      encounter_note: encounter_note,
      care_team: care_team,
      stream_channel: stream_channel,
      clinical_info: clinical_info,
      status: status,
      care_request_id: care_request_id === "" ? sessionname : care_request_id,
      provider_wait_time: provider_wait_time,
    };
    console.log(updateData, header, "this is loglog", careReqType);
    let apiCall = axios
      .post(url, updateData, { headers: header })
      .then((response) => {
        console.log(
          JSON.stringify(response.data),
          "This is create temp Patient 4th api encounterStartCall"
        );
        console.log(
          response.data,
          "This is create temp Patient 5th api encounterStartCall"
        );
        dispatch({
          type: SET_ENCOUNTER_CALL_DETAILS,
          payload: response.data[0].data,
        });
        setToSessionStore({
          key: "encounterCallDetails",
          value: JSON.stringify(response.data[0].data),
        });
        console.log(
          "SET_TRIAGE_AI_SUGGESTION",
          response?.data[0]?.data?.triage_ai_suggestions
        );

        dispatch({
          type: SET_AI_PREDS,
          payload: response?.data[0]?.data?.ai_preds || [],
        });
        dispatch({
          type: SET_TRIAGE_AI_SUGGESTION,
          payload: response?.data[0]?.data?.triage_ai_suggestions || {
            diagnoses: [],
            medications: [],
            procedures: [],
            procedures_done: [],
          },
        });
        dispatch({
          type: SET_VITALS,
          payload: response?.data[0]?.data?.vitals || {
            bpm: "",
            oxygen: "",
            rr: "",
            stressStatus: "",
            systolic: "",
            hrv: "",
          },
        });

        const meetingContext = {
          name: "getMeetingContext",
        };

        axios.post("/api/zoomapp/livestream", {
          meetingId: meetingId,
          care_request_id: response.data[0].data?.care_request_id,
        });
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        navigate("/consultation-screen");
      })
      .catch((error) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const setEncounterNote = (notes) => {
  return (dispatch) => {
    dispatch({
      type: SET_ENCOUNTER_NOTES,
      payload: notes,
    });
  };
};

export const onlyTranscribe = (
  jwtAuthToken,
  organization_id,
  he_type,
  patient_id,
  navigate,
  provider_id,
  display_name,
  meetingId
) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER, payload: true });

    var header = {
      Authorization: "Bearer " + jwtAuthToken,
      organization_id: organization_id,
      he_type: he_type,
    };
    const url = API_URL + "/carerequest_flow_provider?patient_id=" + patient_id;
    console.log(header, "header", url);
    let apiCall = axios
      .post(url, {}, { headers: header })
      .then(async (response) => {
        console.log(
          response.data,
          "This is create temp Patient 3rd api onlyTranscribe"
        );
        var conss = {
          encounter_time: null,
          transcript: null,
          encounter_note: null,
          care_team: null,
          stream_channel: null,
          clinical_info: null,
          status: "Scheduled",
        };
        const sessionPassword = String(
          Math.floor(100000 + Math.random() * 900000)
        );
        const roleType = "1";
        const sessionIdleTimeoutMins = "30";
        const wait_time = 1;
        // dispatch({
        //   type: SET_LOADER,
        //   payload: false,
        // });
        dispatch(
          encounterStartCall(
            jwtAuthToken,
            patient_id,
            provider_id,
            response.data?.care_request_id,
            sessionPassword,
            conss.encounter_time,
            conss.transcript,
            conss.encounter_note,
            conss.care_team,
            conss.stream_channel,
            conss.clinical_info,
            conss.status,
            response.data?.care_request_id,
            // routeParams.care_provider[0].wait_time,
            wait_time,
            organization_id,
            he_type,
            display_name,
            roleType,
            sessionIdleTimeoutMins,
            navigate,
            "zoom encounter",
            meetingId
          )
        );
      })
      .catch((err) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const addProviderAddress = (uid, organization_id, jwtToken) => {
  return async (dispatch) => {
    const url = API_URL + "/add_details?uid=" + uid + "&detail_flag=address";
    let address = {
      address: [
        {
          address_line1: "221B Baker's St.",
          address_line2: "",
          city: "New York City",
          country: "United States",
          state: "NY",
          zip_code: "94404",
        },
      ],
    };
    var header = {
      Authorization: "Bearer " + jwtToken,
      organization_id: organization_id,
      he_type: "Provider",
    };
    axios
      .post(url, address, { headers: header })
      .then((res) => {})
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken());
        }
      });
  };
};

export const guestUserSignUp = (
  data,
  organization_id,
  toast,
  navigate,
  jwtToken,
  provUid,
  display_name,
  meetingId
) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    let patientData = {
      email: `test${data}@gmail.com`,
      first_name: "Zoom",
      middle_name: null,
      last_name: "Guest",
      display_name: `Zoom Guest`,
      gender: null,
      dob: null,
      phone_number: `+1 ${data}`,
      he_type: "Patient",
      photo_url:
        "https://healiomdata.s3.us-east-2.amazonaws.com/default_simple.png",
      password: "Zoom@123",
      initial_zipcode: ["12345"],
      organization_id: [organization_id],
      email_verified: false,
      disabled: false,
      guest: true,
      sub_he_type: "Guest",
    };
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_URL + "/update_user",
      headers: {
        he_type: "Patient",
        "Content-Type": "application/json",
      },
      data: patientData,
    };
    axios(config)
      .then((res) => {
        dispatch({
          type: SET_PATIENT_UID,
          payload: res?.data[0]?.uid || "",
        });
        dispatch({
          type: SET_PATIENT_USER_DATA,
          payload: res?.data[0] || [],
        });
        setToSessionStore({
          key: "patientUid",
          value: res?.data[0]?.uid,
        });
        dispatch(
          onlyTranscribe(
            jwtToken,
            organization_id,
            "Provider",
            res?.data[0]?.uid,
            navigate,
            provUid,
            display_name,
            meetingId
          )
        );
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken(toast));
        } else {
          toast.error("Something went wrong while creating your user!");
        }
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const providerSignUp = (data, navigate, toast, organization_id) => {
  return async (dispatch) => {
    const { first_name, last_name, email, phone_number, password } = data;
    let providerData = {
      email: email,
      first_name: first_name,
      middle_name: null,
      last_name: last_name,
      display_name: `${first_name} ${last_name}`,
      gender: null,
      dob: null,
      phone_number: phone_number,
      he_type: "Provider",
      photo_url:
        "https://healiomdata.s3.us-east-2.amazonaws.com/default_simple.png",
      password: password,
      initial_zipcode: ["12345"],
      organization_id: [organization_id],
      email_verified: false,
      disabled: false,
      guest: true,
      sub_he_type: null,
    };
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_URL + "/update_user",
      headers: {
        he_type: "Provider",
        "Content-Type": "application/json",
      },
      data: providerData,
    };
    axios(config)
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER_DATA,
          payload: res?.data[0] || [],
        });
        setToSessionStore({
          key: "currentUserUid",
          value: res?.data[0]?.uid,
        });
        setToSessionStore({
          key: "organizationId",
          value: res?.data[0]?.organization_id,
        });
        dispatch(
          sentOTP(phone_number, toast, navigate, organization_id, false)
        );
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken(toast));
        } else {
          toast.error("Something went wrong while creating your user!");
        }
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const checkUserExists = (data, navigate, toast, organization_id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const { email, phone_number } = data;
    const config = {
      method: "get",
      url:
        API_URL +
        `/check_user_exists?email=${email}&phone_number=${phone_number}`,
    };
    await axios(config)
      .then((res) => {
        if (res?.data?.data?.uid) {
          dispatch({
            type: STORE_ORG_ID,
            payload: res?.data?.data?.organization_id || "",
          });
          dispatch({
            type: SET_CURRENT_USER_DATA,
            payload: res?.data?.data || [],
          });
          setToSessionStore({
            key: "currentUserUid",
            value: res?.data?.data?.uid,
          });
          setToSessionStore({
            key: "organizationId",
            value: res?.data?.data?.organization_id,
          });
          dispatch({
            type: SET_LOADER,
            payload: false,
          });
          toast.error("User already exists!");
        } else {
          dispatch(providerSignUp(data, navigate, toast, organization_id));
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.error("Something went wrong!");
      });
  };
};

export const getPatientData = (
  patientUid,
  orgId,
  jwtToken,
  toast,
  navigate
) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const config = {
      method: "get",
      url:
        API_URL +
        "/get_details?uid=" +
        patientUid +
        "&detail_flag=specific_keys&keys=uid,he_type,photo_url,email,languages,first_name,middle_name,last_name,display_name,gender,dob,password,phone_number,nick_name,height_in_cms,height_in_inch,weight_in_kg,weight_in_lbs,organization_id,address,insurance,prescription,payment,existing_provider,preferred_pharmacy",
      headers: {
        Authorization: "Bearer " + jwtToken,
        organization_id: orgId,
        he_type: "Patient",
      },
    };
    axios(config)
      .then((res) => {
        dispatch({
          type: SET_PATIENT_USER_DATA,
          payload: res?.data?.data,
        });
        const lastPageExist = sessionStorage.getItem("lastPage");
        navigate(lastPageExist);
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken(toast));
        } else {
          toast.error("Something went wrong!");
        }
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};
export const getUserData = (
  providerUid,
  orgId,
  jwtToken,
  patientUid,
  toast,
  navigate
) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const config = {
      method: "get",
      url:
        API_URL +
        "/get_details?uid=" +
        providerUid +
        "&detail_flag=specific_keys&keys=uid,he_type,photo_url,email,languages,first_name,middle_name,last_name,display_name,gender,dob,password,phone_number,nick_name,height_in_cms,height_in_inch,weight_in_kg,weight_in_lbs,organization_id,address,insurance,prescription,payment,existing_provider,preferred_pharmacy",
      headers: {
        Authorization: "Bearer " + jwtToken,
        organization_id: orgId,
        he_type: "Provider",
      },
    };
    axios(config)
      .then((res) => {
        dispatch({
          type: SET_CURRENT_USER_DATA,
          payload: res?.data?.data,
        });
        if (!res?.data?.data?.address) {
          dispatch(
            addProviderAddress(
              res?.data?.data?.uid,
              res?.data?.data?.organization_id,
              jwtToken
            )
          );
        }
        if (patientUid) {
          dispatch(
            getPatientData(patientUid, orgId, jwtToken, toast, navigate)
          );
        } else {
          const lastPageExist = sessionStorage.getItem("lastPage");
          navigate(lastPageExist);
          dispatch({
            type: SET_LOADER,
            payload: false,
          });
        }
        dispatch(getHistoryTranscriptions(providerUid));
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken(toast));
        } else {
          toast.error("Something went wrong!");
        }
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};

export const sentOTP = (data, toast, navigate, organization_id, sentAgain) => {
  return async (dispatch) => {
    const dialingCode = data?.split(" ")[0];
    const phoneNumber = data?.split(" ")[1];
    let reqData = {
      phoneNumber: phoneNumber,
      countryCode: dialingCode,
    };
    const config = {
      method: "post",
      url: API_URL + "/send_otp_to_phone_number",
      headers: {
        he_type: "Patient",
        maxBodyLength: Infinity,
        organization_id: organization_id,
        "Content-Type": "application/json",
      },
      data: reqData,
    };
    axios(config)
      .then((res) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.success("OTP sent successfully!");
        if (!sentAgain) {
          navigate("/code-sent", {
            state: { data },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.error("Something went wrong!");
      });
  };
};

export const verifyOTP = (data, toast, navigate, organizationId) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    let reqData = {
      phoneNumber: data.phoneNumber,
      countryCode: data.dialingCode,
      otpCode: data.confirmSMSCode,
    };
    const config = {
      method: "post",
      url: API_URL + "/verify_otp",
      headers: {
        he_type: "Patient",
        maxBodyLength: Infinity,
        organization_id: organizationId,
        "Content-Type": "application/json",
      },
      data: reqData,
    };
    axios(config)
      .then((res) => {
        getUserToken(data, dispatch, toast, navigate, "sign-up");
        navigate("/start-new-consultation");
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.success("Verified successfully!");
      })
      .catch((err) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.error("Invalid Code!");
      });
  };
};

/** get refresh token to access healiom APIs */
export const getRefreshToken = (toast) => {
  return async (dispatch) => {
    const uid = sessionStorage.getItem("currentUserUid");
    const organization_id = sessionStorage.getItem("organizationId");
    const jwtToken = sessionStorage.getItem("jwtToken");
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const config = {
      method: "get",
      url: API_URL + `/refresh_token?uid=${uid}&token=${jwtToken}`,
      headers: {
        he_type: "System",
        organization_id: organization_id,
        Authorization: "Bearer " + jwtToken,
      },
    };
    axios(config)
      .then((res) => {
        setToSessionStore({
          key: "jwtToken",
          value: res?.data?.token?.access_token,
        });
        dispatch(setJWTToken(res?.data?.access_token));
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.error("Invalid Operation!");
      });
  };
};

/** sign out user */
export const signOut = (navigate, toast) => {
  return async (dispatch) => {
    dispatch({
      type: USER_LOGOUT,
    });
    sessionStorage.clear();
    navigate("/");
    toast.success("Logged out successfully!");
    dispatch({
      type: SET_LOADER,
      payload: false,
    });
  };
};

export const setSelHistoryData = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_SEL_HISTORY_DATA,
      payload: {},
    });
  };
};

export const emptyHistoryList = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_HISTORY_LIST,
      payload: [],
    });
  };
};

export const getHistoryTranscriptions = (uid, type) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: AI_SERVER + `/dev/history?uid=${uid}`,
      headers: {},
    };
    axios.request(config).then((res) => {
      dispatch({
        type: SET_LOADER,
        payload: false,
      });
      dispatch({
        type: SET_HISTORY_LIST,
        payload: res?.data,
      });
    });
  };
};

export const getSelectedTranscriptDetails = (conversation_id) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: AI_SERVER + `/dev/history?conversation_id=${conversation_id}`,
      headers: {},
    };
    axios.request(config).then((res) => {
      dispatch({
        type: SET_LOADER,
        payload: false,
      });
      // navigate(`/history/conversation/${conversation_id}`);
      dispatch({
        type: SET_SEL_HISTORY_DATA,
        payload: res?.data,
      });
    });
  };
};
