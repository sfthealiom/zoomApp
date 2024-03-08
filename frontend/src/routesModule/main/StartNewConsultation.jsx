/** library imports */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  convertEpochToLocal,
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import {
  HeButton,
  HeHeading1,
  HeHeading2,
  HeInfoText,
} from "../../heCustomComponents";
import { companyMetaData } from "../../assets/myCompanyData";
/** shadcn imports */
import { toast } from "sonner";
import axios from "axios";
/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { guestUserSignUp } from "../../reduxFolder/actions/AuthActions";
import moment from "moment";

const StartNewConsultation = () => {
  const dispatch = useDispatch();
  const [listOfTranscripts, setListOfTranscripts] = useState([]);

  const { loader, labelData, appLanguage, currentUserData, meetingId } =
    useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    setToSessionStore({
      key: "lastPage",
      value: "/start-new-consultation",
    });
  }, []);

  useEffect(() => {
    setListOfTranscripts(convertEpochToLocal(historyList));
  }, [historyList]);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-xl items-center flex flex-col gap-2 justify-between h-full md:p-4">
        <div
          className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <div>
            <HeHeading1 title={`Hi, Jane`} className={`text-center`} />
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
                    meetingId
                  )
                );
                // const response = axios.post("/api/zoomapp/livestream", {
                //   meetingId: "83362685615",
                // });
              }}
            />
          </div>
        </div>

        {/* past sessions */}
        <div
          className="w-full flex flex-col gap-2 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <HeHeading2 title={"Past Sessions"} className={"text-left"} />
          {listOfTranscripts?.length > 0
            ? listOfTranscripts?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full text-sm h-fit cursor-pointer border border-slate-400 p-2 rounded-md"
                    style={{
                      backgroundColor: companyMetaData?.primaryLightest,
                    }}
                    onClick={() => {
                      navigate(`/history/conversation/${item?.name}`);
                    }}
                  >
                    <div className="break-words font-semibold">
                      conversation id: ...
                      {item?.name?.split("__")[2]?.slice(-8)}
                    </div>
                    <div className="">{item?.timestamp}</div>
                  </div>
                );
              })
            : // <p className="text-center text-slate-400 font-semibold">
              //   No data found.
              // </p>
              null}
          <div
            className="w-full text-sm h-fit cursor-pointer border border-slate-400 p-2 rounded-md"
            style={{
              backgroundColor: companyMetaData?.primaryLightest,
            }}
            // onClick={() => {
            //   navigate(`/history/conversation/copilot__17729187391`);
            // }}
          >
            <div className="break-words font-semibold">
              conversation id: ...{17729187391}
            </div>
            <div className="">
              {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartNewConsultation;
