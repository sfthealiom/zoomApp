/** library imports */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import { HeButton, HeFormSubmitButton } from "../../heCustomComponents";
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

/** shadcn imports */
import encounterNotes from "./consultationSections/data.json";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const ConsultationNotes = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const diffDiag = encounterNotes?.ai_preds?.entities?.diagnoses;
  const workDiag = encounterNotes?.ai_preds?.entities?.diagnoses;
  const medications = [
    {
      code: "IDA:7789",
      code_value: "Paracetamol",
      quantity: "1",
      refills: "0",
      daySupply: "5",
      form_way: "Oral",
      route: "Oral",
      directions: "Daily",
      allowSub: "Yes",
      inClinic: "Yes",
      orderReason: "Order notes",
      pharmacyNotes: "Reason notes",
    },
  ];
  const orderNotes = [{}];

  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/consultation-notes",
    });
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-xl items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
        <div className="w-full flex flex-col gap-2">
          <div
            className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
            style={{ backgroundColor: companyMetaData?.accentWhite }}
          >
            <SubjectiveNotes subjectiveData={"Final subjective notes...."} />
            <ObjectiveNotes objectiveData={"Final objective notes...."} />
            <DiagnosisNotes diffDiag={diffDiag} workDiag={workDiag} />
            <MedicationNotes medications={medications} />
            {/* <OrderNotes orderNotes={orderNotes} />
            <ProcedureNotes />
            <CareTaskNotes /> */}
          </div>
          <div
            className="w-full rounded-md"
            style={{
              boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
            }}
          >
            {/* <HeFormSubmitButton title={"Done"} className={`w-full mt-4`} /> */}
            <HeButton
              title={"Done"}
              className={`w-full mt-4`}
              onPress={() => navigate("/start-new-consultation")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationNotes;
