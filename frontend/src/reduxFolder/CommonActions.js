import axios from "axios";
import {
  SET_ALL_DROPDOWN_DATA,
  SET_LABEL_DATA,
  SET_LOADER,
} from "./actions/ActionTypes";
import { configSecret } from "../assets/awsSecrets";
import { setToSessionStore } from "./CommonFunctions";
import { getUserData, setJWTToken } from "./actions/AuthActions";
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
          navigate("/transcribe");
          toast.success("Logged in successfully!");
          dispatch(
            getUserData(
              res?.data?.uid,
              orgId,
              res?.data?.access_token,
              toast,
              navigate
            )
          );
        }
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
