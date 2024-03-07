/** library imports */
import React, { useEffect, useState } from "react";
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
import encounterNotes from "./consultationSections/data.json";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const ReviewNotes = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [endSession, setEndSession] = useState(false);

  const medicationsSchema = z.object({
    code: z.string().min(1, "Required"),
    value: z.string().min(1, "Required"),
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
    value: z.string().min(1, "Required"),
    inClinic: z.boolean({
      invalid_type_error: "Invalid",
      required_error: "Required",
    }),
  });
  const procDoneSchema = z.object({
    code: z.string().min(1, "Required"),
    value: z.string().min(1, "Required"),
    orderReason: z.string().optional(),
  });
  const diagSchema = z.object({
    code: z.string().min(1, "Required"),
    value: z.string().min(1, "Required"),
  });
  const FormSchema = z.object({
    subjective: z.string().min(10, "Required"),
    objective: z.string().min(10, "Required"),
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
      subjective: "Subjective Notes from redux",
      objective: "Objective Notes from redux",
      diffDiag: encounterNotes?.ai_preds?.entities?.diagnoses,
      workDiag: encounterNotes?.ai_preds?.entities?.diagnoses,
      medications: [
        {
          code: "HHAJD",
          value: "Paracetamol",
          quantity: "1",
          daySupply: "5",
          refills: "0",
          form_way: "Oral",
          route: "Oral",
          directions: "Note....",
          allowSub: false,
          inClinic: false,
          pharmacyNotes: "Notes......",
          orderReason: "Notes.....123123",
        },
      ],
      orders: [
        {
          code: "IIAD:24234",
          value: "Order",
          inClinic: false,
        },
      ],
      procDone: [
        {
          code: "ISD;987",
          value: "Procedure",
          orderReason: "Reason.....",
        },
      ],
      careTaskNotes: "Care Task & Directives Notes......",
    },
  });

  const handleData = (data, e) => {
    console.log(data);
  };

  useEffect(() => {
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
            <div className="w-full flex flex-col gap-8 md:gap-12 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
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

export default ReviewNotes;
