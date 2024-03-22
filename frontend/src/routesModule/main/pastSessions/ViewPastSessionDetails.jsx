/** library imports */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/** custom imports */
import { LoaderSpin } from "../../../components/helpers";
import { HeButton } from "../../../heCustomComponents";
import {
  CareTaskNotes,
  DiagnosisNotes,
  MedicationNotes,
  ObjectiveNotes,
  OrderNotes,
  ProcedureNotes,
  RelativeDiagnosesNotes,
  SubjectiveNotes,
} from "../consultNotes";
import { companyMetaData } from "../../../assets/myCompanyData";

/** shadcn imports */

/** redux imports */
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { setSelHistoryData } from "../../../reduxFolder/actions/AuthActions";
import { setToSessionStore } from "../../../reduxFolder/CommonFunctions";
import BackButton from "../../common/BackButton";

const ViewPastSessionDetails = () => {
  const { loader, selHistoryData } = useSelector((state) => state.authReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  // states for response data
  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsCopied("");
    }, 2000);
  }, [isCopied]);

  useEffect(() => {
    window.scroll(0, 0);
    setSelHistoryData();
    setToSessionStore({
      key: "lastPage",
      value: `/history/conversation/${id}`,
    });
  }, [id]);

  return loader ? (
    <LoaderSpin />
  ) : (
    <div>
      <BackButton onClick={() => navigate("/start-new-consultation")} />
      <section className="w-full flex items-center justify-center">
        <div className="w-[95%] max-w-[1024px] items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
          {Object?.keys(selHistoryData)?.length > 0 ? (
            <div className="w-full flex flex-col gap-2">
              <div
                className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
                style={{ backgroundColor: companyMetaData?.accentWhite }}
              >
                {/* <div>{JSON.stringify(selHistoryData)}</div> */}
                <div className="w-full flex flex-col gap-4">
                  <SubjectiveNotes
                    subjectiveData={selHistoryData.subjective_clinical_summary}
                  />
                </div>

                <ObjectiveNotes
                  objectiveData={selHistoryData?.objective_clinical_summary}
                />
                <RelativeDiagnosesNotes
                  diffDiag={selHistoryData?.previous_diagnoses}
                />
                <DiagnosisNotes
                  diffDiag={selHistoryData?.diagnoses}
                  workDiag={selHistoryData?.working_diagnoses}
                />
                <MedicationNotes medications={selHistoryData?.medications} />
                <OrderNotes orderNotes={selHistoryData?.procedures} />
                <ProcedureNotes
                  procedureNotes={selHistoryData?.procedures_done}
                />
                <CareTaskNotes
                  careNotes={selHistoryData?.care_task_directives}
                />
              </div>

              <div
                className="w-full rounded-md"
                style={{
                  boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
                }}
              >
                <HeButton
                  title={"New Recording"}
                  icon={
                    <FontAwesomeIcon
                      icon={faMicrophoneLines}
                      className="h-4 w-4"
                    />
                  }
                  className={`w-full mt-4 flex-row-reverse`}
                  onPress={() => {
                    navigate("/start-new-consultation");
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default ViewPastSessionDetails;
