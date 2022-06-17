import React from "react";
import { ThreeCircles } from "react-loader-spinner";
import { companyMetaData } from "../../assets/myCompanyData";

const LoaderSpin = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeCircles
        height="80"
        width="80"
        color={companyMetaData?.base}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default LoaderSpin;
