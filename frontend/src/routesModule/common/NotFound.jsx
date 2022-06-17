import { companyMetaData } from "../../assets/myCompanyData";

const NotFound = () => {
  return (
    <div
      className="text-white flex justify-center items-center h-screen"
      style={{ backgroundColor: companyMetaData.accentBlack }}
    >
      <div className="flex items-center gap-10">
        <h1 className="font-bold text-3xl">404</h1>
        <p>This page could not be found.</p>
      </div>
    </div>
  );
};

export default NotFound;
