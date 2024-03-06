/** library imports */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { HeHeading2, HeHeading3 } from "../../../heCustomComponents";
import { AIProcessPill, Pill } from "../../../components/helpers";
import { companyMetaData } from "../../../assets/myCompanyData";
import data from "./data.json";
import AddMed from "./addCards/AddMed";

/** shadcn import */
import { Form } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";

const Medications = () => {
  const dispatch = useDispatch();
  const { currentUserData, jwtToken, staticData } = useSelector(
    (state) => state.authReducer
  );

  let medications = data?.ai_preds?.entities?.medications;

  const [search, setSearch] = useState("");
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
  const FormSchema = z.object({
    medications: z.array(medicationsSchema).min(1, "Required"),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      medications: [],
    },
  });
  const watchMeds = form.watch("medications");

  const handleData = (data, e) => {
    console.log(data);
  };

  useEffect(() => {
    // dispatch(autoCompleteSearch("medications", search));
  }, [search]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.reset, form.formState.isSubmitSuccessful]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Medication Orders"} className={`md:text-[18px]`} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleData)}
          className="w-full flex flex-col gap-2"
        >
          {watchMeds?.length > 0 && (
            <div className="flex flex-col gap-2">
              {watchMeds?.map((item, index) => {
                return (
                  <AddMed
                    key={index}
                    form={form}
                    fieldName={"medications"}
                    index={index}
                    watchMeds={watchMeds}
                  />
                );
              })}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Start typing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-slate-200 rounded-md px-4 py-3 h-10"
            />
            <div
              className="flex flex-col gap-2 rounded-md"
              style={{
                backgroundColor: companyMetaData?.aiLight,
                color: companyMetaData?.aiDark,
              }}
            >
              <div className="flex gap-1 items-center px-2 pt-2">
                <FontAwesomeIcon
                  icon={faWandMagicSparkles}
                  className="h-4 w-4"
                />
                <HeHeading3
                  title={"AI Suggesstions"}
                  className={`md:text-[18px]`}
                />
              </div>
              <div className="w-full h-fit max-h-[200px] overflow-scroll flex flex-col gap-2 scrollbar px-2 pb-2">
                {medications.length > 0
                  ? medications?.map((item, index) => {
                      return (
                        <Pill
                          key={index}
                          code={item?.code}
                          name={item?.code_value}
                          className={`cursor-pointer`}
                          icon={<FontAwesomeIcon icon={faPlus} />}
                          pillColor={companyMetaData?.accentWhite}
                          textColor={companyMetaData?.aiDark}
                          onPress={() => {
                            const previousValues = form.watch("medications");
                            form.setValue("medications", [
                              ...previousValues,
                              {
                                code: item?.code,
                                value: item?.code_value,
                                quantity: "",
                                refills: "",
                                daySupply: "",
                                form_way: "",
                                route: "",
                                directions: "",
                                allowSub: "",
                                inClinic: "",
                                orderReason: "",
                                pharmacyNotes: "",
                              },
                            ]);
                          }}
                        />
                      );
                    })
                  : null}
                <AIProcessPill />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Medications;
