/** library imports */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
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

const ConsultationScreen = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [endSession, setEndSession] = useState(false);

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
    code_value: z.string().min(1, "Required"),
    quantity: z.string().min(1, "Required"),
    refills: z.string().min(1, "Required"),
    daySupply: z.string().min(1, "Required"),
    form_way: z.string().min(1, "Required"),
    route: z.string().min(1, "Required"),
    directions: z.string().min(3, "Required"),
    allowSub: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
    inClinic: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
    orderReason: z.string().optional(),
    pharmacyNotes: z.string().optional(),
  });
  const ordersSchema = z.object({
    code: z.string().min(1, "Required"),
    code_value: z.string().min(1, "Required"),
    inClinic: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
  });
  const procDoneSchema = z.object({
    code: z.string().min(1, "Required"),
    code_value: z.string().min(1, "Required"),
    orderReason: z.string().optional(),
  });
  const diagSchema = z.object({
    code: z.string().min(1, "Required"),
    code_value: z.string().min(1, "Required"),
  });
  const FormSchema = z.object({
    diffDiag: z.array(diagSchema).optional(),
    workDiag: z.array(diagSchema).optional(),
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

  const handleData = (data, e) => {
    const { diffDiag, workDiag, medications, orders, procDone, careTaskNotes } =
      data;
    const encounterNotes = {
      subjective: aiSubjec?.join(""),
      objective: aiObjec?.join(""),
      differentDiag: diffDiag,
      workingDiag: workDiag,
      medications,
      orders,
      proceduresDone: procDone,
      careTaskDirectives: careTaskNotes,
    };
    console.log(encounterNotes);
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleData)}
            className="w-full flex flex-col gap-2"
          >
            <div className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
              <Subjective aiData={aiSubjec} />
              <Objective aiData={aiObjec} />
              <Diagnosis form={form} aiData={aiDiag} />
              <Medications form={form} aiData={aiMed} />
              <Orders form={form} />
              <ProceduresDoneDuringVisit form={form} aiData={aiProc} />
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
