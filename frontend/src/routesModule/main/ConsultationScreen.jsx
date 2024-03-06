/** library imports */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import {
  HeButton,
  HeFormSubmitButton,
  HeHeading2,
} from "../../heCustomComponents";
import {
  CareTaskDirectives,
  Diagnosis,
  Medications,
  Objective,
  Orders,
  ProceduresDoneDuringVisit,
  Subjective,
} from "./consultationSections";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const ConsultationScreen = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [endSession, setEndSession] = useState(false);

  useEffect(() => {
    setToSessionStore({
      key: "lastPage",
      value: "/consultation-screen",
    });
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-xl items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
        <div className="w-full flex flex-col gap-2 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
          <HeHeading2 title={"Note Builder"} className={`md:text-[18px]`} />
          <div
            className="rounded-md flex flex-col gap-2"
            style={{ backgroundColor: companyMetaData?.primaryLightest }}
          >
            <div className="self-end font-semibold flex items-center gap-1 px-4 pt-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-red-500 h-2 w-2"
              />
              <span>Live Transcript</span>
            </div>
            <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 pb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
              facilis temporibus corrupti est neque veritatis dicta sapiente, ad
              esse. Dicta voluptatem fugiat architecto impedit in reiciendis
              libero ratione dolorem perferendis soluta debitis, ad
              voluptatibus, illum corporis quisquam quis itaque rerum neque,
              consequatur fuga. Dolor asperiores, delectus expedita quam ipsa
              non ea obcaecati vel fugit quibusdam iure ratione hic dolores
              quidem minima molestias sit exercitationem soluta. Aliquam esse
              fugiat voluptate unde sapiente adipisci voluptatibus earum. Ullam,
              officia illo reiciendis eaque iusto doloribus eum ea expedita
              veniam sint molestias quaerat ad quibusdam. Nisi praesentium fuga
              repudiandae dignissimos pariatur laboriosam dicta ut enim?
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
          <Subjective />
          <Objective />
          <Diagnosis />
          <Medications />
          <Orders />
          <ProceduresDoneDuringVisit />
          <CareTaskDirectives />
        </div>
        <div
          className="w-full rounded-md"
          style={{
            boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
          }}
        >
          <HeButton
            title={"End Session"}
            className={`w-full`}
            // onPress={() => navigate("/review-consultation-notes")}
          />
        </div>
      </div>
    </section>
  );
};

export default ConsultationScreen;
