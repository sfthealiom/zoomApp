/** library imports */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  HeBack,
  HeFormSubmitButton,
  HeHeading1,
  HeInfoText,
  HeTextInput,
} from "../../heCustomComponents";

/** shadcn imports */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../reduxFolder/CommonActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const FormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Required"),
  });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAccountCreation = (data, e) => {
    e.preventDefault();
    const updatedData = {
      email: data?.email,
      password: data?.password,
    };
    getUserToken(updatedData, dispatch, toast, navigate, "sign-in");
  };

  return loader ? (
    <LoaderSpin />
  ) : (
    <div className="w-full">
      <div className="w-full flex items-center justify-center my-10 md:my-20">
        <div className="w-full max-w-xs md:max-w-xl flex flex-col items-center">
          <div className="text-center">
            <HeHeading1 title={"Welcome back!"} />
            <HeInfoText
              message={
                "Sign in to start using the Copilot and generate transcription effortlessly."
              }
              className={"text-xs md:text-sm mt-2 md:mt-4"}
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAccountCreation)}
              className="flex flex-col gap-2 justify-between w-full h-full"
            >
              <div className="flex flex-col gap-2 md:gap-4 mt-5 border border-slate-300 rounded-xl shadow-md p-4 md:p-8">
                <HeTextInput
                  form={form}
                  type="email"
                  fieldName={"email"}
                  labelName={"Email"}
                  placeholder={"john.doe@company.com"}
                  required={true}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-slate-500">
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <div className="flex items-center border-b border-slate-500">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="w-full border-none"
                            placeholder="************"
                            {...field}
                          />
                        </FormControl>
                        {showPassword ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="h-5 w-5 cursor-pointer select-none"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="h-5 w-5 cursor-pointer select-none"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex self-center mt-8 md:mt-16 gap-2 items-center">
                <HeBack navigateTo={"/welcome"} />
                <HeFormSubmitButton
                  title={"Continue"}
                  className={"w-fit self-center"}
                  icon={
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  }
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
