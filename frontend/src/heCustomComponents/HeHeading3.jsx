import React from "react";

const HeHeading3 = ({ title, className }) => {
  return (
    <h1 className={`text-sm md:text-base font-semibold ${className}`}>
      {title}
    </h1>
  );
};

export default HeHeading3;
