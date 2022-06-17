/** library imports */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** custom imports */
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */

/** redux states */
import { useDispatch } from "react-redux";
import {
  getStaticData,
  setLangData,
  setStaticData,
} from "../../reduxFolder/CommonActions";
import { isObjectEmpty } from "../../reduxFolder/CommonFunctions";
import { getUserData } from "../../reduxFolder/actions/AuthActions";

const Splash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadStaticData = () => {
    return new Promise((resolve, reject) => {
      getStaticData().then((res) => {
        if (!isObjectEmpty(res)) {
          const data = {
            staticData: res?.staticData,
            lang: res?.lang,
          };
          resolve(data);
        } else {
          const data =
            "Failed to load data, please try again or check your connection.";
          reject(data);
        }
      });
    });
  };

  useEffect(() => {
    loadStaticData()
      .then((res) => {
        dispatch(setStaticData(res?.staticData));
        dispatch(setLangData(res?.lang));
      })
      .then(() => {
        const lastPageExist = sessionStorage.getItem("lastPage");
        if (lastPageExist) {
          const currentUserUid = sessionStorage.getItem("currentUserUid");
          const organizationId = sessionStorage.getItem("organizationId");
          const jwtToken = sessionStorage.getItem("jwtToken");

          if (currentUserUid && jwtToken) {
            dispatch(
              getUserData(
                currentUserUid,
                organizationId,
                jwtToken,
                toast,
                navigate
              )
            );
          } else {
            navigate("/consultation-screen");
          }
        } else {
          navigate("/welcome");
        }
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen rounded-lg">
      <div className="flex gap-2 flex-col justify-center items-center p-2">
        <img
          src={companyMetaData.companyLogoUrl}
          alt="company.png"
          className="w-[100px] rounded-md shadow-md p-2"
        />
        <h1 className="text-2xl font-bold">{companyMetaData.companyName}</h1>
      </div>
    </div>
  );
};

export default Splash;
