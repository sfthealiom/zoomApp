import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const HeCopy = ({ targetText, targetId }) => {
  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsCopied("");
    }, 2000);
  }, [isCopied]);

  return (
    <div>
      {isCopied === targetId ? (
        <div className="flex items-center text-slate-500">
          <FontAwesomeIcon icon={faCheck} className="h-4 w-4 mr-1" />
          <span>Copied</span>
        </div>
      ) : (
        <button onClick={() => setIsCopied(targetId)}>
          <FontAwesomeIcon
            icon={faCopy}
            className="cursor-pointer h-5 w-5 text-slate-300"
            onClick={() => {
              navigator.clipboard.writeText(targetText);
            }}
          />
        </button>
      )}
    </div>
  );
};

export default HeCopy;
