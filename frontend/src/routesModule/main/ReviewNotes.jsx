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
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

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
      subjective: "",
      objective: "",
      diffDiag: [],
      workDiag: [],
      medications: [],
      orders: [],
      procDone: [],
      careTaskNotes: "",
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
              <HeFormSubmitButton title={"Done"} className={`w-full mt-4`} />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ReviewNotes;
