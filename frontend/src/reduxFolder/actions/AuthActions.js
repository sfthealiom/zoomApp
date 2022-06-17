import axios from "axios";
import { configSecret } from "../../assets/awsSecrets";
import {
  SET_APP_LANG,
  SET_CURRENT_USER_DATA,
  SET_LOADER,
  SET_PASSWORD,
  STORE_JWT_TOKEN,
  STORE_ORG_ID,
  USER_LOGOUT,
} from "./ActionTypes";
import { setToSessionStore } from "../CommonFunctions";
import { getUserToken } from "../CommonActions";

const { API_URL } = configSecret;

export const setAppLang = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_APP_LANG,
      payload: value,
    });
  };
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

export const guestUserSignUp = (data, navigate, toast, organization_id) => {
  return async (dispatch) => {
    const { first_name, last_name, email, phone_number, password } = data;
    let patientData = {
      email: email,
      first_name: first_name,
      middle_name: null,
      last_name: last_name,
      display_name: `${first_name} ${last_name}`,
      gender: null,
      dob: null,
      phone_number: phone_number,
      he_type: "Patient",
      photo_url:
        "https://healiomdata.s3.us-east-2.amazonaws.com/default_simple.png",
      password: password,
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
        organization_id: organization_id,
        "Content-Type": "application/json",
      },
      data: patientData,
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
          dispatch(getRefreshToken());
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
          dispatch(guestUserSignUp(data, navigate, toast, organization_id));
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

export const getUserData = (uid, orgId, jwtToken, toast, navigate) => {
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
        uid +
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
          type: SET_CURRENT_USER_DATA,
          payload: res?.data?.data,
        });
        const lastPageExist = sessionStorage.getItem("lastPage");
        console.log(lastPageExist);
        navigate(lastPageExist);
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          dispatch(getRefreshToken());
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
        navigate("/transcribe");
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
export const getRefreshToken = () => {
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
