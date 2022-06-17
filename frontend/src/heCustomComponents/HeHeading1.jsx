import React from "react";

const HeHeading1 = ({ title, className }) => {
  return (
    <h1 className={`text-xl md:text-3xl font-semibold ${className}`}>
      {title}
    </h1>
  );
};

export default HeHeading1;
