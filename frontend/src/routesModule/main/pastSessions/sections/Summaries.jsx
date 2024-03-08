import React from "react";
import { isObjectEmpty } from "../../../../reduxFolder/CommonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const Summaries = ({ aiPreds, isCopied, setIsCopied }) => {
  return !isObjectEmpty(aiPreds)
    ? !isObjectEmpty(aiPreds?.summaries) && (
        <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-2 justify-center mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.summaries.subjectiveClinicalSummary?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">Subjective</h1>
                      {isCopied === "subjective" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("subjective")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                aiPreds?.summaries?.subjectiveClinicalSummary
                              );
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="h-[150px] text-slate-600 overflow-y-scroll scrollbar mt-2">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.summaries?.subjectiveClinicalSummary
                            ?.length > 0 && (
                            <p>
                              {aiPreds?.summaries?.subjectiveClinicalSummary?.join(
                                " "
                              )}
                            </p>
                          )
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.summaries.objectiveClinicalSummary?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">Objective</h1>
                      {isCopied === "objective" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("objective")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                aiPreds?.summaries?.objectiveClinicalSummary
                              );
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="h-[150px] text-slate-600 overflow-y-scroll scrollbar mt-2">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.summaries?.objectiveClinicalSummary?.length >
                            0 && (
                            <p>
                              {aiPreds?.summaries?.objectiveClinicalSummary?.join(
                                " "
                              )}
                            </p>
                          )
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.summaries.clinicalAssessment?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">Assessment</h1>
                      {isCopied === "assessment" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("assessment")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                aiPreds?.summaries?.clinicalAssessment
                              );
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="h-[150px] text-slate-600 overflow-y-scroll scrollbar mt-2">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.summaries?.clinicalAssessment?.length >
                            0 && (
                            <p>
                              {aiPreds?.summaries?.clinicalAssessment?.join(
                                " "
                              )}
                            </p>
                          )
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.summaries.carePlanSuggested?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">Plan</h1>
                      {isCopied === "carePlan" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("carePlan")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                aiPreds?.summaries?.carePlanSuggested
                              );
                            }}
                          />
                        </button>
                      )}
                    </div>
                    <div className="h-[150px] text-slate-600 overflow-y-scroll scrollbar mt-2">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.summaries?.carePlanSuggested?.length > 0 && (
                            <p>
                              {aiPreds?.summaries?.carePlanSuggested?.join(" ")}
                            </p>
                          )
                        : null}
                    </div>
                  </div>
                )
              : null}
          </div>
        </section>
      )
    : null;
};

export default Summaries;
