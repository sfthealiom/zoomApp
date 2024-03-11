import React from "react";

const HeInfoText = ({ message, style, className }) => {
  return (
    <div
      className={`text-sm md:text-base text-slate-400 max-w-md md:max-w-xl ${className}`}
      style={style}
    >
      {message}
    </div>
  );
};

export default HeInfoText;
