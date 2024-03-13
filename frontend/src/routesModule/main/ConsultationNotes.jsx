/** library imports */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import { setToSessionStore } from "../../reduxFolder/CommonFunctions";
import { HeButton } from "../../heCustomComponents";
import {
  CareTaskNotes,
  DiagnosisNotes,
  MedicationNotes,
  ObjectiveNotes,
  OrderNotes,
  ProcedureNotes,
  SubjectiveNotes,
} from "./consultNotes";
import { companyMetaData } from "../../assets/myCompanyData";
import {
  getEncounterNote,
  setInitialValues,
  getHistoryTranscriptions,
} from "../../reduxFolder/actions/AuthActions";
/** shadcn imports */

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

const ConsultationNotes = () => {
  const dispatch = useDispatch();
  const { loader, encounterCallDetails, encounter_notes } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const jwtToken = sessionStorage.getItem("jwtToken");
  const providerUID = sessionStorage.getItem("currentUserUid");

  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/consultation-notes",
    });
  }, []);

  useEffect(() => {
    dispatch(
      getEncounterNote(
        jwtToken,
        encounterCallDetails.encounterid,
        companyMetaData.organizationId,
        "patient",
        navigate
      )
    );
  }, [dispatch, encounterCallDetails.encounterid, jwtToken, navigate]);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-[95%] max-w-[1024px] items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
            style={{ backgroundColor: companyMetaData?.accentWhite }}
          >
            <div className="w-full flex flex-col gap-4">
              <CopyToClipboard
                text={encounter_notes.subjective_clinical_summary}
              >
                <HeButton
                  title={"Copy to Clipboard"}
                  titleClass={"text-slate-600 text-base"}
                  className={
                    "w-full h-12 border-2 border-slate-400 text-slate-600"
                  }
                  bgColor={companyMetaData?.accentGray}
                  onPress={() => console.log("test")}
                />
              </CopyToClipboard>
              <SubjectiveNotes
                subjectiveData={encounter_notes.subjective_clinical_summary}
              />
            </div>
            {Object.keys(encounter_notes).length > 0 ? (
              <>
                <ObjectiveNotes
                  objectiveData={encounter_notes?.objective_clinical_summary}
                />
                <DiagnosisNotes
                  diffDiag={encounter_notes?.diagnoses}
                  workDiag={encounter_notes?.working_diagnoses}
                />
                <MedicationNotes medications={encounter_notes?.medications} />
                <OrderNotes orderNotes={encounter_notes?.procedures} />
                <ProcedureNotes
                  procedureNotes={encounter_notes?.procedures_done}
                />
                <CareTaskNotes
                  careNotes={encounter_notes?.care_task_directives}
                />
              </>
            ) : null}
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
                <FontAwesomeIcon icon={faMicrophoneLines} className="h-4 w-4" />
              }
              className={`w-full mt-4 flex-row-reverse`}
              onPress={() => {
                dispatch(setInitialValues());
                dispatch(
                  getHistoryTranscriptions(
                    jwtToken,
                    companyMetaData.organizationId,
                    "Provider",
                    providerUID,
                    toast
                  )
                );
                navigate("/start-new-consultation");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationNotes;
