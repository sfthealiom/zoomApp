import React from "react";
import { isObjectEmpty } from "../../../../reduxFolder/CommonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const OtherEntities = ({ vitals, personalDetails, isCopied, setIsCopied }) => {
  return (
    <section className="w-full max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {!isObjectEmpty(vitals) && (
        <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">Vital Options</h1>
            {isCopied === "vitals" ? (
              <div className="flex items-center text-slate-400">
                <FontAwesomeIcon icon={faCheck} className="h-4 w-4 mr-1" />
                <span>Copied</span>
              </div>
            ) : (
              <button onClick={() => setIsCopied("vitals")}>
                <FontAwesomeIcon
                  icon={faCopy}
                  className="h-6 w-6 text-slate-300 cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(vitals));
                  }}
                />
              </button>
            )}
          </div>
          <ul className="list-disc pl-6 mt-2 h-[100px] text-slate-600 overflow-y-scroll">
            {!isObjectEmpty(vitals)
              ? Object.entries(vitals).map(([key, value]) =>
                  value?.value ? (
                    <li key={key}>
                      <h1>
                        <span className="font-semibold">{key}</span>:{" "}
                        {value?.text}{" "}
                      </h1>
                    </li>
                  ) : null
                )
              : null}
          </ul>
        </div>
      )}
      {!isObjectEmpty(personalDetails)
        ? !isObjectEmpty(personalDetails) && (
            <div className="w-full h-fit max-h-[300px] shadow-md rounded-md p-4 bg-white">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl">Personal Demographics</h1>
                {isCopied === "personalDetails" ? (
                  <div className="flex items-center text-slate-400">
                    <FontAwesomeIcon icon={faCheck} className="h-4 w-4 mr-1" />
                    <span>Copied</span>
                  </div>
                ) : (
                  <button onClick={() => setIsCopied("personalDetails")}>
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="h-6 w-6 text-slate-300 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          JSON.stringify(personalDetails)
                        );
                      }}
                    />
                  </button>
                )}
              </div>
              <ul className="list-disc pl-6 mt-2 h-[100px] text-slate-600 overflow-y-scroll">
                {!isObjectEmpty(personalDetails)
                  ? Object.entries(personalDetails).map(([key, value]) =>
                      value?.value ? (
                        <li key={key}>
                          <h1>
                            <span className="font-semibold">{key}</span>:{" "}
                            {value?.text}{" "}
                          </h1>
                        </li>
                      ) : null
                    )
                  : null}
              </ul>
            </div>
          )
        : null}
    </section>
  );
};

export default OtherEntities;
