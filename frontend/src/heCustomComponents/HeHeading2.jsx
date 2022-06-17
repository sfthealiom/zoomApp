import React from "react";

const HeHeading2 = ({ title, className }) => {
  return (
    <h1 className={`text-base md:text-xl font-semibold ${className}`}>
      {title}
    </h1>
  );
};

export default HeHeading2;
