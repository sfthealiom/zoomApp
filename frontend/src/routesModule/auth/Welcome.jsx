/* globals zoomSdk */
/** library imports */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { json, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from "react-password-strength-bar";
import { SET_MEETING_ID } from "../../reduxFolder/actions/ActionTypes";
/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  phoneRegex,
  hasUpperCase,
  hasLowerCase,
  atleastOneNumber,
  atleastOneSpecialChar,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import {
  HeButton,
  HeFormSubmitButton,
  HeHeading1,
  HeHeading3,
  HeInfoText,
  HePhoneNumber,
  HeTextInput,
} from "../../heCustomComponents";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserExists,
  setPassword,
} from "../../reduxFolder/actions/AuthActions";

const Welcome = (props) => {
  const {
    handleError,
    handleUser,
    handleUserContextStatus,
    user,
    userContextStatus,
  } = props;
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage, meetingId } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const FormSchema = z
    .object({
      first_name: z.string().min(3, "Minimum 3 characters are required"),
      last_name: z.string().min(3, "Minimum 3 characters are required"),
      email: z.string().email("Invalid Email"),
      dialCode: z.string().min(1, "Required"),
      mobile: z.string().regex(phoneRegex, "Invalid Phone Number"),
      npi: z.string(),
      password: z.string().min(8, "Required"),
      confirmPassword: z.string().min(8, "Required"),
      check1: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check2: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check3: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check4: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords did not match!",
          path: ["confirmPassword"],
        });
      }
    });
  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      dialCode: "",
      mobile: "",
      email: "",
      npi: "",
      password: "",
      confirmPassword: "",
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    },
  });

  const watchPasswordField = form.watch("password");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (watchPasswordField) {
      if (
        hasLowerCase(watchPasswordField) &&
        hasUpperCase(watchPasswordField)
      ) {
        form.setValue("check1", true);
      }
      if (atleastOneNumber(watchPasswordField)) {
        form.setValue("check2", true);
      }
      if (atleastOneSpecialChar(watchPasswordField)) {
        form.setValue("check3", true);
      }
      if (watchPasswordField?.length >= 8) {
        form.setValue("check4", true);
      }
    }
  }, [watchPasswordField]);

  const handleAccountCreation = (data, e) => {
    const item = {
      name: "getMeetingContext",
    };
    invokeZoomAppsSdk(item);
    e.preventDefault();
    const updatedData = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      phone_number: data?.dialCode + " " + data?.mobile?.replaceAll("-", ""),
      password: data?.password,
    };
    console.log(updatedData);
    setToSessionStore({
      key: "phone_number",
      value: updatedData?.phone_number,
    });
    dispatch(setPassword(data?.password));
    dispatch(
      checkUserExists(
        updatedData,
        navigate,
        toast,
        companyMetaData?.organizationId
      )
    );
  };

  const [userAuthorized, setUserAuthorized] = useState(null);
  const [showInClientOAuthPrompt, setShowInClientOAuthPrompt] = useState(false);
  const [inGuestMode, setInGuestMode] = useState(false);

  useEffect(() => {
    // this is not the best way to make sure > 1 instances are not registered
    console.log("In-Client OAuth flow: onAuthorized event listener added");
    zoomSdk.addEventListener("onAuthorized", (event) => {
      const { code, state } = event;
      console.log("3. onAuthorized event fired.");
      console.log(
        "3a. Here is the event passed to event listener callback, with code and state: ",
        event
      );
      console.log(
        "4. POST the code, state to backend to exchange server-side for a token.  Refer to backend logs now . . ."
      );

      fetch("/api/zoomapp/onauthorized", {
        method: "POST",
        body: JSON.stringify({
          code,
          state,
          href: window.location.href,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        console.log(
          "4. Backend returns succesfully after exchanging code for auth token.  Go ahead and update the UI"
        );
        setUserAuthorized(true);

        // the error === string
        handleError(null);
      });
    });
  }, [handleError]);

  useEffect(() => {
    zoomSdk.addEventListener("onMyUserContextChange", (event) => {
      handleUserContextStatus(event.status);
    });
    async function fetchUser() {
      try {
        // An example of using the Zoom REST API via proxy
        const response = await fetch("/zoom/api/v2/users/me");
        if (response.status !== 200) throw new Error();
        const user = await response.json();
        handleUser(user);
        setShowInClientOAuthPrompt(false);
      } catch (error) {
        console.error(error);
        console.log(
          "Request to Zoom REST API has failed ^, likely because no Zoom access token exists for this user. You must use the authorize API to get an access token"
        );
        setShowInClientOAuthPrompt(true);
        // setError("There was an error getting your user information");
      }
    }

    if (userContextStatus === "authorized") {
      setInGuestMode(false);
      fetchUser();
    } else if (
      userContextStatus === "unauthenticated" ||
      userContextStatus === "authenticated"
    ) {
      setInGuestMode(true);
    }
  }, [handleUser, handleUserContextStatus, userAuthorized, userContextStatus]);

  const invokeZoomAppsSdk = (api) => {
    const { name, buttonName = "", options = null } = api;
    const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk);
    const response = zoomAppsSdkApi(options)
      .then((clientResponse) => {
        console.log(
          `${buttonName || name} success with response: ${JSON.stringify(
            clientResponse
          )}`
        );
        dispatch({
          type: SET_MEETING_ID,
          payload: clientResponse?.meetingID,
        });
      })
      .catch((clientError) => {
        console.log(
          `${buttonName || name} error: ${JSON.stringify(clientError)}`
        );
      });

    return response;
  };
  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAccountCreation)}
          className="w-[95%] max-w-[1024px] items-center flex flex-col gap-2 justify-between h-full md:p-4"
        >
          <div
            className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
            style={{ backgroundColor: companyMetaData?.accentWhite }}
          >
            <div className="text-center flex flex-col items-center">
              <HeHeading3 title={"Already registered?"} />
              <HeInfoText
                message={
                  "Greetings! Let's kick off your journey with a quick verification, and then we're all set to perform clinical encounters!"
                }
                className={"text-xs md:text-sm mt-2"}
              />
              <HeButton
                title={"Click here to login"}
                className={"mt-3"}
                bgColor={companyMetaData?.primary}
                onPress={() => {
                  const item = {
                    name: "getMeetingContext",
                  };
                  invokeZoomAppsSdk(item);
                  navigate("/sign-in");
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8 bg-white">
            <div className="text-center flex flex-col items-center">
              <HeHeading1 title={"Welcome!"} />
              <HeInfoText
                message={
                  "To start, we would like to create an account for you. This allows us to save your information so you don't have to go through this again!"
                }
                className={"text-xs md:text-sm mt-2 md:mt-4"}
              />
            </div>
            <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
              <HeTextInput
                form={form}
                fieldName={"first_name"}
                labelName={"Legal First Name"}
                placeholder={"John"}
                required={true}
              />
              <HeTextInput
                form={form}
                fieldName={"last_name"}
                labelName={"Last Name"}
                placeholder={"Doe"}
                required={true}
              />
            </div>
            <HePhoneNumber
              form={form}
              labelValue={"Phone"}
              dialCodeField={"dialCode"}
              phoneNumField={"mobile"}
            />
            <HeTextInput
              form={form}
              type="email"
              fieldName={"email"}
              labelName={"Email"}
              placeholder={"john.doe@company.com"}
              required={true}
            />
            <HeTextInput
              form={form}
              type="tel"
              fieldName={"npi"}
              labelName={"NPI"}
              placeholder={"XXXXX12345"}
              maxLength={10}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-500">
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center border-b border-slate-500">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="w-full border-none"
                        placeholder="************"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="h-5 w-5 cursor-pointer select-none"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="h-5 w-5 cursor-pointer select-none"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-500">
                    Confirm Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex items-center border-b border-slate-500">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="w-full border-none"
                        placeholder="************"
                        {...field}
                      />
                    </FormControl>
                    {showPassword ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className="h-5 w-5 cursor-pointer select-none"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="h-5 w-5 cursor-pointer select-none"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <PasswordStrengthBar
                password={watchPasswordField}
                className="flex flex-col text-center"
              />
              <h1 className="text-sm">Your password must contain:</h1>
              <div className="mt-3 text-sm flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="check1"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormLabel>Upper & lower case</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="check2"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <Checkbox
                          checked={atleastOneNumber(watchPasswordField)}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormLabel>At least one number</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="check3"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <Checkbox
                          checked={atleastOneSpecialChar(watchPasswordField)}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormLabel>At least one special character</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="check4"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <Checkbox
                          checked={watchPasswordField?.length >= 8}
                          onCheckedChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormLabel>Min 8 characters</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex self-center mt-8 md:mt-16 gap-2 items-center">
            <HeFormSubmitButton
              title={"Continue"}
              className={"w-fit self-center"}
              icon={<FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />}
            />
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Welcome;
