/** library imports */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../../components/helpers";
import {
  setToSessionStore,
  isObjectEmpty,
  filterJSON,
} from "../../../reduxFolder/CommonFunctions";
import { Summaries, CPOE, OtherEntities } from "./sections";
import { companyMetaData } from "../../../assets/myCompanyData";

/** shadcn imports */
import { Separator } from "../../../components/ui/Separator";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedTranscriptDetails,
  setSelHistoryData,
} from "../../../reduxFolder/actions/AuthActions";

const ViewPastSessionDetails = () => {
  const dispatch = useDispatch();
  const { loader, selHistoryData } = useSelector((state) => state.authReducer);

  const { id } = useParams();

  // states for response data
  const [transcript, setTranscript] = useState("");
  const [aiPreds, setAiPreds] = useState({});
  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsCopied("");
    }, 2000);
  }, [isCopied]);

  useEffect(() => {
    window.scroll(0, 0);
    setSelHistoryData();
    setToSessionStore({
      key: "lastPage",
      value: `/history/conversation/${id}`,
    });
    dispatch(getSelectedTranscriptDetails(id));
  }, [id]);

  useEffect(() => {
    if (selHistoryData) {
      setTranscript(selHistoryData?.transcript);
      setAiPreds(selHistoryData?.ai_preds);
    }
  }, [selHistoryData]);

  const otherAIPredsEntities = !isObjectEmpty(aiPreds)
    ? filterJSON(aiPreds, ["entities", "summaries"])
    : null;

  const vitals = !isObjectEmpty(otherAIPredsEntities)
    ? filterJSON(otherAIPredsEntities, [
        "age",
        "gender",
        "height",
        "weight",
        "ethnicity",
        "insurance",
        "physicalActivityExercise",
      ])
    : null;

  const personalDetails = !isObjectEmpty(otherAIPredsEntities)
    ? filterJSON(otherAIPredsEntities, [
        "bmi",
        "bloodPressure",
        "pulse",
        "respiratoryRate",
        "bodyTemperature",
        "substanceAbuse",
      ])
    : null;

  return loader ? (
    <LoaderSpin />
  ) : (
    <div className="flex flex-col gap-4 items-center justify-between my-8">
      <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-2 items-center justify-center">
        <h1
          className="font-semibold text-2xl md:text-4xl text-center"
          style={{ color: companyMetaData?.base }}
        >
          Complete Details
        </h1>
        <span className="break-all text-center font-semibold">{id}</span>
      </section>
      <Separator className="max-w-xs md:nax-w-lg lg:max-w-2xl xl:max-w-4xl" />
      {transcript && (
        <section
          className="w-full max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-2 shadow-md rounded-md p-4"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">
              Transcription with Long Lookback
            </h1>
            {isCopied === "transcript" ? (
              <div className="flex text-slate-400 items-center">
                <FontAwesomeIcon icon={faCheck} className="h-4 w-4 mr-1" />
                <span>Copied</span>
              </div>
            ) : (
              <button onClick={() => setIsCopied("transcript")}>
                <FontAwesomeIcon
                  icon={faCopy}
                  className="h-6 w-6 text-slate-300 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(transcript);
                  }}
                />
              </button>
            )}
          </div>
          <textarea
            name="json-response"
            id="json-response"
            rows="10"
            placeholder="Transcipted text..."
            className="w-full resize-none outline-none text-slate-600 disabled:bg-transparent scrollbar"
            value={transcript}
            disabled
          ></textarea>
        </section>
      )}

      {/* summaries */}
      {!isObjectEmpty(aiPreds) && (
        <Summaries
          aiPreds={aiPreds}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />
      )}

      {/* ai preds entities section */}
      {!isObjectEmpty(aiPreds) && (
        <CPOE aiPreds={aiPreds} isCopied={isCopied} setIsCopied={setIsCopied} />
      )}

      {/* other ai preds entities section */}
      {(!isObjectEmpty(vitals) || !isObjectEmpty(personalDetails)) && (
        <OtherEntities
          vitals={vitals}
          personalDetails={personalDetails}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />
      )}

      {!isObjectEmpty(selHistoryData)
        ? selHistoryData?.text === "Transcription not found" && (
            <p className="text-center text-slate-400 font-semibold">
              No data found.
            </p>
          )
        : null}
    </div>
  );
};

export default ViewPastSessionDetails;
