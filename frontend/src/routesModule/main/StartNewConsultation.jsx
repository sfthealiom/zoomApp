/** library imports */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import { HeButton, HeHeading1, HeInfoText } from "../../heCustomComponents";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const StartNewConsultation = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    setToSessionStore({
      key: "lastPage",
      value: "/start-new-consultation",
    });
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-xs md:max-w-xl items-center flex flex-col gap-2 justify-between h-full md:p-4">
        <div className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8 bg-white">
          <div>
            <HeHeading1 title={`Hi, Jane`} className={`text-center`} />
            <HeInfoText
              message={
                "To start, we would like to create an account for you. This allows us to save your information so you don't have to go through this again!"
              }
              className={"text-xs md:text-sm mt-2 md:mt-4"}
            />
          </div>
          <div
            className="rounded-md"
            style={{
              boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
            }}
          >
            <HeButton
              title={`Start New Consultation Recording `}
              className={`w-full flex-row-reverse h-12`}
              titleClass={`text-lg`}
              icon={
                <FontAwesomeIcon icon={faMicrophoneLines} className="h-5 w-5" />
              }
              onPress={() => {
                const promise = new Promise((resolve) =>
                  setTimeout(() => resolve(), 2000)
                );
                toast.promise(promise, {
                  loading: "Starting...",
                  success: () => {
                    navigate("/consultation-screen");
                    return `Consultation started!`;
                  },
                  error: "Something went wrong, Please try again!",
                });
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartNewConsultation;
