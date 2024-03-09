/** library imports */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import { completeEncounter } from "../../reduxFolder/actions/AuthActions";
import { HeFormSubmitButton } from "../../heCustomComponents";
import {
  CareTaskDirectives,
  Diagnosis,
  Medications,
  Objective,
  Orders,
  ProceduresDone,
  Subjective,
} from "./reviewSections";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import { Form } from "../../components/ui/Form";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const ReviewNotes = () => {
  const dispatch = useDispatch();
  const {
    loader,
    labelData,
    appLanguage,
    encounter_notes,
    encounterCallDetails,
    aiSuggestions,
    meetingId,
  } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const jwtToken = sessionStorage.getItem("jwtToken");

  const medicationsSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    quantity_unit: z.coerce
      .number()
      .int({ message: "Required" })
      .positive({ message: "Required" }),
    refills: z.coerce.number().int().nonnegative(),
    days_supply: z.coerce
      .number()
      .int({ message: "Required" })
      .positive({ message: "Required" }),
    dispense_unit: z.coerce
      .number()
      .int({ message: "Required" })
      .positive({ message: "Required" }),
    route: z.coerce
      .number()
      .int({ message: "Required" })
      .positive({ message: "Required" }),
    frequency: z.string().optional(),
    substitutions_allowed: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
    reason: z.string().optional(),
    pharmacy_notes: z.string().optional(),
  });
  const ordersSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    order_fulfilment: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
  });
  const procDoneSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    reason: z.string().optional(),
  });
  const diffDiagSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    reason: z.string().optional(),
  });
  const workDiagSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
  });
  const FormSchema = z.object({
    subjective: z.string().optional(),
    objective: z.string().optional(),
    diffDiag: z.array(diffDiagSchema).optional(),
    workDiag: z.array(workDiagSchema).optional(),
    medications: z.array(medicationsSchema).optional(),
    orders: z.array(ordersSchema).optional(),
    procDone: z.array(procDoneSchema).optional(),
    careTaskNotes: z.string().optional(),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    // put your redux state variables here
    defaultValues: {
      subjective: encounter_notes.subjective_clinical_summary?.join(""),
      objective: encounter_notes.objectiveClinicalSummary?.join(""),
      diffDiag: encounter_notes.diagnoses,
      workDiag: encounter_notes.working_diagnoses,
      medications: encounter_notes.medications,
      orders: encounter_notes.procedures,
      procDone: encounter_notes.procedures_done,
      careTaskNotes: encounter_notes.care_task_directives?.join(""),
    },
  });

  const handleData = (data, e) => {
    console.log(data);
    const notes = {
      subjective_clinical_summary: data.subjective,
      ai_predictions: true,
      patient_location: null,
      diagnoses: data.diffDiag,
      diagnoses_comments: null,
      medications: data.medications,
      working_diagnoses: data.workDiag,
      medication_comments: null,
      generic_medication: null,
      lab_imaging: [],
      lab_imaging_comments: null,
      procedures: data.orders,
      procedures_done: data.procDone,
      procedure_comments: null,
      referal_data: [],
      referal_comment: null,
      follow_up: {},
      follow_up_comments: null,
      patient_education: {},
      care_task_directives: data?.careTaskNotes,
      objective_clinical_summary: data?.objective,
      comment: null,
    };
    dispatch(
      completeEncounter(
        jwtToken,
        encounterCallDetails.care_request_id,
        encounterCallDetails.encounterid,
        encounterCallDetails.patient_msg_id,
        encounterCallDetails.patientid,
        encounterCallDetails.provider_msg_id,
        encounterCallDetails.provider_wait_time,
        encounterCallDetails.providerid,
        aiSuggestions,
        companyMetaData?.organizationId,
        "provider",
        navigate,
        notes,
        encounterCallDetails,
        meetingId
      )
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/review-consultation-notes",
    });
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-xs sm:max-w-xl items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleData)}
            className="w-full flex flex-col gap-2"
          >
            <div
              className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
              style={{ backgroundColor: companyMetaData?.accentWhite }}
            >
              <Subjective form={form} />
              <Objective form={form} />
              <Diagnosis form={form} />
              <Medications form={form} />
              <Orders form={form} />
              <ProceduresDone form={form} />
              <CareTaskDirectives form={form} />
            </div>
            <div
              className="w-full rounded-md"
              style={{
                boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
              }}
            >
              <HeFormSubmitButton title={"Done"} className={`w-full mt-4`} />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ReviewNotes;
