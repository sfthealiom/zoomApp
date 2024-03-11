/** library imports */
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

/** custom imports */
import {
  HeFormSubmitButton,
  HeHeading1,
  HeTick,
} from "../../heCustomComponents";
import { LoaderSpin } from "../../components/helpers";
import { companyMetaData } from "../../assets/myCompanyData";

/** shadcn imports */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import {
  setToSessionStore,
  getLabels,
} from "../../reduxFolder/CommonFunctions";
import { sentOTP, verifyOTP } from "../../reduxFolder/actions/AuthActions";

const CodeSent = () => {
  const dispatch = useDispatch();
  const { loader, appLanguage, labelData, orgId, password } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const codeRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setToSessionStore({
      key: "lastPage",
      value: "/code-sent",
    });
    codeRef?.current?.focus();
  }, []);

  const smsCodeReg = /^\d{6}$/;
  const FormSchema = z.object({
    confirmSMSCode: z.string().regex(smsCodeReg, "Invalid code"),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmSMSCode: "",
    },
  });

  const handleData = (data) => {
    const { confirmSMSCode } = data;
    const phone = sessionStorage.getItem("phone_number");
    const dialingCode = phone?.split(" ")[0];
    const phoneNumber = phone?.split(" ")[1];
    const updatedData = {
      confirmSMSCode,
      dialingCode: dialingCode,
      phoneNumber: phoneNumber,
      password: password,
    };
    dispatch(verifyOTP(updatedData, toast, navigate, orgId));
  };

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleData)}
          className="w-[95%] max-w-[1024px] items-center flex flex-col gap-2 justify-between h-full md:p-4"
        >
          <div
            className="w-full min-h-[80vh] flex flex-col items-center gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8"
            style={{ backgroundColor: companyMetaData?.accentWhite }}
          >
            <div className="flex flex-col items-center gap-5 text-center h-fit">
              <HeTick />
              <HeHeading1 title={"Account successfully created!"} />
              <p className="text-sm md:text-base text-slate-600 max-w-[320px] md:max-w-xl">
                {/* {getLabels("patOnSendCodeMessagge", appLanguage, labelData)} */}
                We sent you a code to your mobile number. Please enter it below.
              </p>
            </div>
            <div className="w-full max-w-xs flex flex-col justify-center items-center gap-4">
              <h1 className="font-bold mt-5">
                {getLabels(
                  "patOnSendCodeConfirmPrompt",
                  appLanguage,
                  labelData
                )}
              </h1>
              <div className="w-full flex flex-col items-center gap-4 border border-slate-200 rounded-md p-5">
                <FormField
                  control={form.control}
                  name={"confirmSMSCode"}
                  render={({ field }) => (
                    <FormItem className={`w-full`}>
                      <FormControl>
                        <Input
                          type={"tel"}
                          ref={codeRef}
                          maxLength={6}
                          className={`font-semibold`}
                          placeholder={"******"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <HeFormSubmitButton
                  title={getLabels("patOnSendCodeBtn", appLanguage, labelData)}
                  className={`w-full`}
                />
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 text-center mt-4">
              {/* {getLabels("patOnSendCodeNoCode", appLanguage, labelData)} */}
              Didn't recieve the code?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                  const phone = sessionStorage.getItem("phone_number");
                  dispatch(
                    sentOTP(
                      phone,
                      toast,
                      navigate,
                      companyMetaData?.organizationId,
                      true
                    )
                  );
                }}
              >
                Send again
              </span>
            </p>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CodeSent;
