import React from "react";
import { isObjectEmpty } from "../../../../reduxFolder/CommonFunctions";
import { ViewPill } from "../../../../components/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const CPOE = ({ aiPreds, isCopied, setIsCopied }) => {
  return !isObjectEmpty(aiPreds)
    ? !isObjectEmpty(aiPreds?.entities) && (
        <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col gap-2 justify-center mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.entities?.diagnoses?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">
                        Diagnosis Options
                      </h1>
                      {/* {isCopied === "diagnoses" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("diagnoses")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                JSON.stringify(aiPreds?.entities?.diagnoses)
                              );
                            }}
                          />
                        </button>
                      )} */}
                    </div>
                    <div className="h-[200px] overflow-y-scroll flex flex-col gap-2 mt-4 scrollbar">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.entities.diagnoses.length > 0
                          ? aiPreds?.entities?.diagnoses?.map((item, index) => {
                              return (
                                <ViewPill
                                  key={index}
                                  code={item?.code}
                                  name={item?.code_value}
                                />
                              );
                            })
                          : null
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.entities?.medications?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">
                        Medication Options
                      </h1>
                      {/* {isCopied === "medications" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("medications")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                JSON.stringify(aiPreds?.entities?.medications)
                              );
                            }}
                          />
                        </button>
                      )} */}
                    </div>
                    <div className="h-[200px] overflow-y-scroll flex flex-col gap-2 mt-4 scrollbar">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.entities.medications.length > 0
                          ? aiPreds?.entities?.medications?.map(
                              (item, index) => {
                                return (
                                  <ViewPill
                                    key={index}
                                    code={item?.code}
                                    name={item?.code_value}
                                  />
                                );
                              }
                            )
                          : null
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.entities?.procedures?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">
                        Procedure Options
                      </h1>
                      {/* {isCopied === "procedures" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("procedures")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                JSON.stringify(aiPreds?.entities?.procedures)
                              );
                            }}
                          />
                        </button>
                      )} */}
                    </div>
                    <div className="h-[200px] overflow-y-scroll flex flex-col gap-2 mt-4 scrollbar">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.entities.procedures.length > 0
                          ? aiPreds?.entities?.procedures?.map(
                              (item, index) => {
                                return (
                                  <ViewPill
                                    key={index}
                                    code={item?.code}
                                    name={item?.code_value}
                                  />
                                );
                              }
                            )
                          : null
                        : null}
                    </div>
                  </div>
                )
              : null}
            {!isObjectEmpty(aiPreds)
              ? aiPreds?.entities?.symptoms?.length > 0 && (
                  <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl">Symptom Options</h1>
                      {/* {isCopied === "symptoms" ? (
                        <div className="flex items-center text-slate-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="h-4 w-4 mr-1"
                          />
                          <span>Copied</span>
                        </div>
                      ) : (
                        <button onClick={() => setIsCopied("symptoms")}>
                          <FontAwesomeIcon
                            icon={faCopy}
                            className="h-6 w-6 text-slate-300 cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                JSON.stringify(aiPreds?.entities?.symptoms)
                              );
                            }}
                          />
                        </button>
                      )} */}
                    </div>
                    <div className="h-[200px] overflow-y-scroll flex flex-col gap-2 mt-4 scrollbar">
                      {!isObjectEmpty(aiPreds)
                        ? aiPreds?.entities.symptoms.length > 0
                          ? aiPreds?.entities?.symptoms?.map((item, index) => {
                              return (
                                <ViewPill
                                  key={index}
                                  code={item?.code}
                                  name={item?.code_value}
                                />
                              );
                            })
                          : null
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

export default CPOE;
