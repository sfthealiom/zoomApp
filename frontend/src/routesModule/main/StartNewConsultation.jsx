/* globals zoomSdk */
/** library imports */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import { setToSessionStore } from "../../reduxFolder/CommonFunctions";
import {
  HeButton,
  HeHeading1,
  HeHeading2,
  HeInfoText,
} from "../../heCustomComponents";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import { toast } from "sonner";
import moment from "moment";
/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import {
  guestUserSignUp,
  getSelectedTranscriptDetails,
} from "../../reduxFolder/actions/AuthActions";
import { SET_MEETING_ID } from "../../reduxFolder/actions/ActionTypes";

const StartNewConsultation = () => {
  const dispatch = useDispatch();
  const [listOfTranscripts, setListOfTranscripts] = useState([]);

  const { loader, currentUserData, meetingId, historyList } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/start-new-consultation",
    });
  }, []);

  useEffect(() => {
    setListOfTranscripts(historyList);
  }, [historyList]);

  const invokeZoomAppsSdk = (api) => {
    const { name, buttonName = "", options = null } = api;
    const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk);
    const response = zoomAppsSdkApi(options)
      .then((clientResponse) => {
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

  useEffect(() => {
    const item = {
      name: "getMeetingContext",
    };
    invokeZoomAppsSdk(item);
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-[95%] max-w-[1024px] items-center flex flex-col gap-2 justify-between h-full md:p-4">
        <div
          className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <div className="flex flex-col items-center">
            <HeHeading1
              title={`Hi, ${currentUserData?.first_name ?? ""}`}
              className={`text-center`}
            />
            <HeInfoText
              message={
                "To start, we would like to create an account for you. This allows us to save your information so you don't have to go through this again!"
              }
              className={
                "max-w-full text-xs text-center md:text-sm mt-2 md:mt-4"
              }
            />
          </div>
          <div
            className="rounded-md"
            style={{
              boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
            }}
          >
            <HeButton
              title={`Start New Consultation Recording `}
              className={`w-full flex-row-reverse h-12`}
              titleClass={`text-sm md:text-base`}
              icon={
                <FontAwesomeIcon icon={faMicrophoneLines} className="h-5 w-5" />
              }
              onPress={() => {
                dispatch(
                  guestUserSignUp(
                    Date.now(),
                    companyMetaData?.organizationId,
                    toast,
                    navigate,
                    jwtToken,
                    currentUserData.uid,
                    currentUserData.display_name,
                    meetingId,
                    "zoom encounter"
                  )
                );
              }}
            />
          </div>
        </div>

        {/* past sessions */}
        <div
          className="w-full flex flex-col gap-2 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <HeHeading2 title={"Past Consultations"} className={"text-left"} />
          {listOfTranscripts?.length > 0 ? (
            listOfTranscripts?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full text-sm h-fit cursor-pointer border border-slate-400 p-2 rounded-md"
                  style={{
                    backgroundColor: companyMetaData?.accentGray,
                  }}
                  onClick={() => {
                    dispatch(
                      getSelectedTranscriptDetails(
                        item?.encounter_id,
                        jwtToken,
                        companyMetaData?.organizationId,
                        "patient",
                        toast,
                        navigate
                      )
                    );
                  }}
                >
                  <div className="text-sm">
                    {`${moment(
                      item?.create_dt,
                      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
                    ).format("YYYY-MM-DD")} ${moment(
                      item?.create_tm,
                      "HH:mm:ss.SSSSSS"
                    ).format("HH:mm")} `}
                    <span className="text-gray-500 text-sm">
                      {moment(item?.create_dt).fromNow()}
                    </span>
                  </div>
                  <div className="text-sm">{`Encounter ID: ${item?.care_request_id
                    ?.split("__")[2]
                    ?.slice(-6)}`}</div>
                  <div className="w-full truncate">
                    {item?.subjective_summary}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400 text-sm">No data found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StartNewConsultation;
