import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon icon={faArrowLeft} className="ml-2" />
    </button>
  );
};

export default BackButton;
