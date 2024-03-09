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
      quantity_unit: "1",
      refills: "0",
      days_supply: "5",
      dispense_unit: "Oral",
      route: "Oral",
      frequnecy: "Daily",
      substitutions_allowed: "Yes",
      reason: "Order notes",
      pharmacy_notes: "Reason notes",
    },
  ];
  const orderNotes = [
    {
      code: "ASH:9798",
      code_value: "Order",
      order_fulfilment: "No",
    },
  ];
  const procDoneNotes = [
    {
      code: "ASH:9798",
      code_value: "Procedure",
      reason: "Procedure notes",
    },
  ];

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
            <div className="w-full flex flex-col gap-4">
              <HeButton
                title={"Copy to Clipboard"}
                titleClass={"text-slate-600 text-base"}
                className={
                  "w-full h-12 border-2 border-slate-400 text-slate-600"
                }
                bgColor={companyMetaData?.accentGray}
                onPress={() =>
                  navigator.clipboard.writeText(
                    JSON.stringify({ object: "notes" })
                  )
                }
              />
              <SubjectiveNotes subjectiveData={"Final subjective notes...."} />
            </div>
            <ObjectiveNotes objectiveData={"Final objective notes...."} />
            <DiagnosisNotes diffDiag={diffDiag} workDiag={workDiag} />
            <MedicationNotes medications={medications} />
            <OrderNotes orderNotes={orderNotes} />
            <ProcedureNotes />
            <CareTaskNotes />
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
