import axios from "axios";
import {
  SET_ALL_DROPDOWN_DATA,
  SET_AUTOCOMPLETE_ALLERGY_DATA,
  SET_AUTOCOMPLETE_DIAGNOSES_DATA,
  SET_AUTOCOMPLETE_LABS_DATA,
  SET_AUTOCOMPLETE_MED_DATA,
  SET_AUTOCOMPLETE_PROC_DONE_DATA,
  SET_AUTOCOMPLETE_RELATIVE_DIAGNOSES_DATA,
  SET_LABEL_DATA,
  SET_LOADER,
} from "./actions/ActionTypes";
import { configSecret } from "../assets/awsSecrets";
import { setToSessionStore } from "./CommonFunctions";
import {
  getRefreshToken,
  getUserData,
  setJWTToken,
} from "./actions/AuthActions";
import { companyMetaData } from "../assets/myCompanyData";

const { API_URL } = configSecret;

/** load languages */
export const getLanguages = async () => {
  var url = API_URL + "/get_languages";
  let apiCall = axios
    .get(url, {})
    .then((res) => {
      return res.data?.current_translated_data;
    })
    .catch((err) => {
      console.log(err, "error while fetching languages");
      return {};
    });

  return apiCall;
};

/** get static data */
export const getStaticData = async () => {
  var url = API_URL + "/get_static_data?given_type=all";

  const res = await axios.get(url).catch((err) => {
    console.log("Error while loading static data", err);
  });
  const lang = await getLanguages().catch((err) => {
    console.log("Error while loading lang data", err);
  });
  return {
    staticData: res?.data,
    lang: lang,
  };
};

export const setStaticData = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ALL_DROPDOWN_DATA,
      payload: value,
    });
  };
};

export const setLangData = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_LABEL_DATA,
      payload: value,
    });
  };
};

/** get user jwt token to access healiom APIs */
export const getUserToken = async (data, dispatch, toast, navigate, type) => {
  if (type === "sign-in") {
    dispatch({
      type: SET_LOADER,
      payload: true,
    });
  }
  const phone_number =
    data?.dialingCode && data?.phoneNumber
      ? (data?.dialingCode || "") + " " + (data?.phoneNumber || "")
      : "";
  const orgId = companyMetaData?.organizationId;
  let config = {
    method: "get",
    url:
      API_URL +
      `/get_jwt_token?email=${
        data?.email || ""
      }&phone_number=${phone_number}&password=${data?.password}`,
    headers: {
      organization_id: orgId,
    },
  };
  return axios(config)
    .then((res) => {
      if (res?.data?.access_token?.length > 0) {
        setToSessionStore({
          key: "jwtToken",
          value: res?.data?.access_token,
        });
        if (type === "sign-in") {
          setToSessionStore({
            key: "currentUserUid",
            value: res?.data?.uid,
          });
          setToSessionStore({
            key: "organizationId",
            value: orgId,
          });
          navigate("/start-new-consultation");
          toast.success("Logged in successfully!");
        }
        dispatch(
          getUserData(
            res?.data?.uid,
            orgId,
            res?.data?.access_token,
            "",
            toast,
            navigate
          )
        );
        dispatch(setJWTToken(res?.data?.access_token));
      } else {
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        toast.error("Invalid credentials or user does not exist!");
      }
    })
    .catch((err) => {
      toast.error("Invalid credentials!");
      return err;
    });
};

/** autocomplete API for searching anything with title and text */
export const autoCompleteSearch = (title, text, toast) => {
  return async (dispatch) => {
    const titleMappings = {
      procedures_done: "procedures",
      relativeDiagnoses: "diagnoses",
    };

    let realTitle = titleMappings[title] || title;
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL + `/encounter_autocomplete?title=${realTitle}&text=${text}`,
      headers: {},
    };
    axios
      .request(config)
      .then((res) => {
        let data = [];
        if (res?.data?.length > 0) {
          data = res?.data?.map((item) => {
            return {
              id: item?.code,
              item: item?.code_value,
            };
          });
        }
        if (title === "relativeDiagnoses") {
          dispatch({
            type: SET_AUTOCOMPLETE_RELATIVE_DIAGNOSES_DATA,
            payload: data,
          });
        }
        if (title === "diagnoses") {
          dispatch({
            type: SET_AUTOCOMPLETE_DIAGNOSES_DATA,
            payload: data,
          });
        }
        if (title === "medications") {
          dispatch({
            type: SET_AUTOCOMPLETE_MED_DATA,
            payload: data,
          });
        }
        if (title === "allergies") {
          dispatch({
            type: SET_AUTOCOMPLETE_ALLERGY_DATA,
            payload: data,
          });
        }
        if (title === "procedures") {
          dispatch({
            type: SET_AUTOCOMPLETE_LABS_DATA,
            payload: data,
          });
        }
        if (title === "procedures_done") {
          dispatch({
            type: SET_AUTOCOMPLETE_PROC_DONE_DATA,
            payload: data,
          });
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          // toast({
          //   title: "Invalid token",
          //   description:
          //     "Please wait while we create a fresh token and execute your request",
          //   variant: "note",
          // });
          dispatch(getRefreshToken(toast));
        } else {
          toast({
            title: "Oops!",
            description:
              "Something happened while creating your user, please check your internet connection or try again.",
            variant: "note",
          });
        }
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      });
  };
};
