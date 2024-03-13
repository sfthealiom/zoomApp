import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
        <CopyToClipboard text={targetText}>
          <button onClick={() => setIsCopied(targetId)}>
            <FontAwesomeIcon
              icon={faCopy}
              className="cursor-pointer h-5 w-5 text-slate-300"
              onClick={() => {
                console.log("copied");
              }}
            />
          </button>
        </CopyToClipboard>
      )}
    </div>
  );
};

export default HeCopy;
