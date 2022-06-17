import React from "react";

const HeText = ({ title, className }) => {
  return <h1 className={`text-sm font-light ${className}`}>{title}</h1>;
};

export default HeText;
