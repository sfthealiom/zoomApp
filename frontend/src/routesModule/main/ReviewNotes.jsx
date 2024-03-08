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
import { HeButton, HeFormSubmitButton } from "../../heCustomComponents";
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
import encounterNotes from "../main/consultationSections/data.json";

/** shadcn imports */
import { Form } from "../../components/ui/Form";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const ReviewNotes = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

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
    inClinic: z.string({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
  });
  const procDoneSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
    orderReason: z.string().optional(),
  });
  const diagSchema = z.object({
    code: z.string().min(1, "Required"),
    display: z.string().min(1, "Required"),
  });
  const FormSchema = z.object({
    subjective: z.string(),
    objective: z.string(),
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
      subjective:
        encounterNotes?.ai_preds?.summaries?.subjectiveClinicalSummary?.join(
          ""
        ),
      objective:
        encounterNotes?.ai_preds?.summaries?.objectiveClinicalSummary?.join(""),
      diffDiag: encounterNotes?.ai_preds?.entities?.diagnoses,
      workDiag: encounterNotes?.ai_preds?.entities?.diagnoses,
      medications: encounterNotes?.ai_preds?.entities?.medications,
      orders: encounterNotes?.ai_preds?.entities?.procedures,
      procDone: encounterNotes?.ai_preds?.entities?.procedures_done,
      careTaskNotes:
        encounterNotes?.ai_preds?.summaries?.carePlanSuggested?.join(""),
    },
  });

  const handleData = (data, e) => {
    console.log(data);
    navigate("/consultation-notes");
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
              {/* <HeFormSubmitButton title={"Done"} className={`w-full mt-4`} /> */}
              <HeButton
                title={"Done"}
                className={`w-full mt-4`}
                onPress={() => navigate("/consultation-notes")}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ReviewNotes;
