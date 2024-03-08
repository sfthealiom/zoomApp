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
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import {
  setAiSuggestionNotes,
  setAllTranscript,
  setCC,
  setWebSocketAiPreds,
  completeEncounter,
  submitEncounterNote,
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
import encounterNotes from "./consultationSections/data.json";

/** shadcn imports */
import { Form } from "../../components/ui/Form";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { configSecret } from "../../assets/awsSecrets";

const ConsultationScreen = () => {
  const dispatch = useDispatch();
  const {
    loader,
    labelData,
    appLanguage,
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
  const { WEBSOCKET_URL, TRANSCRIPT_SOCKET_URL, ADMIN_RTMP_URL, RTMP_URL } =
    configSecret;

  const [endSession, setEndSession] = useState(false);
  const [webSocketSignal, setWebSocketSignal] = useState(false);
  const providerUID = sessionStorage.getItem("currentUserUid");
  const jwtToken = sessionStorage.getItem("jwtToken");
  const [data, setdata] = useState("");
  const [jsonData, setJsonData] = useState("");

  const splitCode = (oldArray) => {
    // var newArray = []
    var newArray = oldArray.map((item, index) => {
      return {
        code: item?.code?.split(":")[1],
        code_value: item?.code_value,
        source: item?.source,
      };
    });

    return newArray;
  };

  const leaveSession = (endSession, leaveType) => {
    console.log(
      "leaveSessionleaveSessionleaveSessionleaveSession",
      endSession,
      leaveType
    );
  };

  const leaveProvCall = () => {
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
        encounter_notes,
        "zoom encounter",
        encounterCallDetails
      )
    );
    leaveSession(false, "");
  };

  useEffect(() => {
    var wss = new WebSocket(
      "wss://fluidstack-3090-1.healiom-service.com/asr/dev/v1/websocket"
    );
    var count = 0;
    const providerWebSocketFunction = (count) => {
      count = count++;
      console.log(count, "this is countttt");

      wss.onopen = () => {
        setWebSocketSignal(true);
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

      wss.onclose = (error) => {
        setWebSocketSignal(false);

        if (error.code !== "1000" || error.code !== 1000) {
          providerWebSocketFunction(count);
        }
      };

      wss.onmessage = (event) => {
        var res = JSON.parse(event.data);
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

          if (res?.transcript) {
            dispatch(setAllTranscript(res.transcript, transcriptMessageCount));
          }

          if (res?.cc) {
            dispatch(setCC(res.cc));
          }

          if (res?.ai_preds?.summaries) {
            dispatch(
              setWebSocketAiPreds(
                res?.ai_preds?.summaries,
                JSON.parse(JSON.stringify(webSocketAiPreds))
              )
            );
          }
          if (!res?.success && res?.issue === "time-exceeded") {
            leaveProvCall(true);
          }
        }
      };
      wss.onerror = (error) => {
        console.log(error, "this is errorr");
        setdata(`error${JSON.stringify(error)}`);
        console.log(error, "this is websocket error");
      };
    };

    if (encounterCallDetails) {
      providerWebSocketFunction();
    }
  }, [encounterCallDetails?.care_request_id?.length > 0]);

  // data from ai
  const aiDiag = encounterNotes?.ai_preds?.entities?.diagnoses;
  const aiMed = encounterNotes?.ai_preds?.entities?.medications;
  const aiProc = encounterNotes?.ai_preds?.entities?.procedures;
  const aiSubjec =
    encounterNotes?.ai_preds?.summaries?.subjectiveClinicalSummary;
  const aiObjec = encounterNotes?.ai_preds?.summaries?.objectiveClinicalSummary;
  const aiCarePlan = encounterNotes?.ai_preds?.summaries?.carePlanSuggested;

  const medicationsSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    quantity_unit: z.string().min(1, "Required"),
    refills: z.string().min(1, "Required"),
    days_supply: z.string().min(1, "Required"),
    dispense_unit: z.string().min(1, "Required"),
    route: z.string().min(1, "Required"),
    frequency: z.string().min(3, "Required"),
    substitutions_allowed: z.string({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
    reason: z.string().optional(),
    pharmacy_notes: z.string().optional(),
  });
  const ordersSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    order_fulfilment: z.string({
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
    careTaskNotes: z.string().optional(),
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
      careTaskNotes: aiCarePlan?.join(""),
    },
  });

  const encounterNoteSubmit = () => {};

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
      care_task_directives: data?.careTaskNotes,
      comment: null,
    };
    updateData_temp["encounter_note"] = notes;
    dispatch(
      submitEncounterNote(
        jwtToken,
        updateData_temp,
        companyMetaData?.organizationId,
        "provider"
      )
    );
    axios.post("/api/zoomapp/stoplivestream", {
      meetingId: meetingId,
    });
    // dispatch(
    //   completeEncounter(
    //     jwtToken,
    //     encounterCallDetails.care_request_id,
    //     encounterCallDetails.encounterid,
    //     encounterCallDetails.patient_msg_id,
    //     encounterCallDetails.patientid,
    //     encounterCallDetails.provider_msg_id,
    //     encounterCallDetails.provider_wait_time,
    //     encounterCallDetails.providerid,
    //     aiSuggestions,
    //     companyMetaData.organizationId,
    //     "provider",
    //     navigate,
    //     encounter_notes,
    //     "zoom encounter",
    //     encounterCallDetails,
    //     ""
    //   )
    // );
    navigate("/review-consultation-notes");
  };

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
        <div
          className="w-full flex flex-col gap-2 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4"
          style={{ backgroundColor: companyMetaData?.accentWhite }}
        >
          <HeHeading2 title={"Note Builder"} className={`md:text-[18px]`} />
          {/* <div
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
              {closedCaptions}
            </p>
          </div> */}
          <div
            className="rounded-md flex flex-col gap-2"
            style={{ backgroundColor: companyMetaData?.primaryLightest }}
          >
            <div className="self-end font-semibold flex items-center gap-1 px-4 pt-3">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-red-500 h-2 w-2"
              />
              <span>Long Transcript</span>
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
                aiData={aiSuggestions?.procedures_done}
              />
              <CareTaskDirectives form={form} />
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
