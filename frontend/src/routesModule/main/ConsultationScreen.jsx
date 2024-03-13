/** library imports */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import { setToSessionStore } from "../../reduxFolder/CommonFunctions";
import {
  setAiSuggestionNotes,
  setAllTranscript,
  setCC,
  setWebSocketAiPreds,
  completeEncounter,
  setInitialValues,
} from "../../reduxFolder/actions/AuthActions";
import { HeFormSubmitButton, HeHeading2 } from "../../heCustomComponents";
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
import { Form } from "../../components/ui/Form";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { SET_ENCOUNTER_NOTES } from "../../reduxFolder/actions/ActionTypes";

const ConsultationScreen = () => {
  const dispatch = useDispatch();
  const [startEncounter, setStartEncounter] = useState(true);
  const {
    loader,
    encounterCallDetails,
    aiSuggestions,
    closedCaptions,
    transcriptMessageCount,
    allTranscript,
    webSocketAiPreds,
    encounter_notes,
    meetingId,
  } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const providerUID = sessionStorage.getItem("currentUserUid");
  const jwtToken = sessionStorage.getItem("jwtToken");

  // const leaveProvCall = () => {
  //   dispatch(
  //     completeEncounter(
  //       jwtToken,
  //       encounterCallDetails.care_request_id,
  //       encounterCallDetails.encounterid,
  //       encounterCallDetails.patient_msg_id,
  //       encounterCallDetails.patientid,
  //       encounterCallDetails.provider_msg_id,
  //       encounterCallDetails.provider_wait_time,
  //       encounterCallDetails.providerid,
  //       aiSuggestions,
  //       companyMetaData?.organizationId,
  //       "provider",
  //       navigate,
  //       encounter_notes,
  //       "zoom encounter",
  //       encounterCallDetails
  //     )
  //   );
  // };

  useEffect(() => {
    var wss = new WebSocket(
      "wss://fluidstack-3090-1.healiom-service.com/asr/dev/v1/websocket"
    );
    const providerWebSocketFunction = (count) => {
      count = count++;
      console.log(count, "this is countttt");
      wss.onopen = () => {
        wss.send(
          JSON.stringify({
            stream_key: encounterCallDetails.care_request_id,
            triage_ai_suggestion: encounterCallDetails?.triage_ai_suggestion,
            ai_preds: encounterCallDetails?.triage_result?.analysis_summary,
            user_type: "provider",
            uid: providerUID,
          })
        );
      };

      // wss.onclose = (error) => {
      //   if (error.code !== "1000" || error.code !== 1000) {
      //     providerWebSocketFunction(count);
      //   }
      // };

      wss.onmessage = (event) => {
        var res = JSON.parse(event.data);
        if (res?.cc) {
          dispatch(setCC(res.cc));
        }
        if (res?.transcript) {
          dispatch(setAllTranscript(res.transcript, transcriptMessageCount));
        }
        if (res?.ai_preds?.entities) {
          const newAiSuggestions = {
            diagnoses: res?.ai_preds?.entities?.diagnoses?.length
              ? res?.ai_preds?.entities?.diagnoses
              : aiSuggestions?.diagnoses || [],
            medications: res?.ai_preds?.entities?.medications?.length
              ? res?.ai_preds?.entities?.medications
              : aiSuggestions?.medications || [],
            procedures: res?.ai_preds?.entities?.procedures?.length
              ? res?.ai_preds?.entities?.procedures
              : aiSuggestions?.procedures || [],
            procedures_done: res?.ai_preds?.entities?.procedures_done?.length
              ? res?.ai_preds?.entities?.procedures_done
              : aiSuggestions?.procedures_done || [],
          };

          dispatch(setAiSuggestionNotes(newAiSuggestions));

          if (res?.ai_preds?.summaries) {
            dispatch(
              setWebSocketAiPreds(
                res?.ai_preds?.summaries,
                JSON.parse(JSON.stringify(webSocketAiPreds))
              )
            );
          }
          // if (!res?.success && res?.issue === "time-exceeded") {
          //   leaveProvCall(true);
          // }
        }
      };
      wss.onerror = (error) => {
        console.log(error, "this is websocket error");
      };
    };
    providerWebSocketFunction();
    return () => {
      console.log("closeddd websocket");
      wss.close();
    };
  }, []);

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
    dispense_unit: z.string().min(1, "Required"),
    route: z.string().min(1, "Required"),
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
    diffDiag: z.array(diffDiagSchema).optional(),
    workDiag: z.array(workDiagSchema).optional(),
    medications: z.array(medicationsSchema).optional(),
    orders: z.array(ordersSchema).optional(),
    procDone: z.array(procDoneSchema).optional(),
    // careTaskNotes: z.string().optional(),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      diffDiag: [],
      workDiag: [],
      medications: [],
      orders: [],
      procDone: [],
      // careTaskNotes: "",
    },
  });

  const handleData = (data, e) => {
    var updateData_temp = encounterCallDetails;

    const notes = {
      subjective_clinical_summary: webSocketAiPreds?.subjectiveClinicalSummary,
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
      care_task_directives: webSocketAiPreds?.carePlanSuggested,
      objective_clinical_summary: webSocketAiPreds?.objectiveClinicalSummary,
      comment: null,
    };
    updateData_temp["encounter_note"] = notes;
    dispatch({
      type: SET_ENCOUNTER_NOTES,
      payload: notes,
    });
    axios.post("/api/zoomapp/stoplivestream", {
      meetingId: meetingId,
    });
    navigate("/review-consultation-notes");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/consultation-screen",
    });
  }, []);

  useEffect(() => {
    dispatch(setInitialValues());
  }, []);

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <div className="w-[95%] max-w-[1024px] items-center flex flex-col gap-6 md:gap-8 justify-between h-full">
        <div
          className="w-full flex flex-col gap-2 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <HeHeading2 title={"Note Builder"} className={`md:text-[18px]`} />
          <div
            className="rounded-md flex flex-col gap-2"
            style={{ backgroundColor: companyMetaData?.primaryLightest }}
          >
            <div className="self-start md:self-end font-semibold flex items-center gap-2 px-4 pt-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-red-500 h-2 w-2 animate-ping"
              />
              <span>Live CC</span>
            </div>
            <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 pb-3">
              {closedCaptions}
            </p>
          </div>
          <div
            className="rounded-md flex flex-col gap-2"
            style={{ backgroundColor: companyMetaData?.primaryLightest }}
          >
            <div className="self-start md:self-end font-semibold flex items-center gap-2 px-4 pt-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-red-500 h-2 w-2 animate-ping"
              />
              <span>Live Transcription with Long Lookback</span>
            </div>
            <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 pb-3">
              {allTranscript}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleData)}
            className="w-full flex flex-col gap-2"
          >
            <div className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
              <Subjective
                aiData={webSocketAiPreds?.subjectiveClinicalSummary}
              />
              <Objective aiData={webSocketAiPreds?.objectiveClinicalSummary} />
              <Diagnosis form={form} aiData={aiSuggestions?.diagnoses} />
              <Medications form={form} aiData={aiSuggestions?.medications} />
              <Orders form={form} />
              <ProceduresDoneDuringVisit
                form={form}
                aiData={aiSuggestions?.procedures}
              />
              <CareTaskDirectives
                aiData={webSocketAiPreds?.carePlanSuggested}
              />
            </div>
            <div
              className="w-full rounded-md"
              style={{
                boxShadow: `0px 8px 8px ${companyMetaData?.primaryLight}`,
              }}
            >
              <HeFormSubmitButton
                title={"End Session"}
                className={`w-full mt-4`}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ConsultationScreen;
