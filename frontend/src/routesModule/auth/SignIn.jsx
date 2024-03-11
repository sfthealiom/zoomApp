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

const SignIn = ({ data }) => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage, meetingId } = useSelector(
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
    <section className="w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAccountCreation)}
          className="w-[95%] max-w-[1024px] items-center flex flex-col gap-2 justify-between h-full md:p-4"
        >
          <div className="w-full flex flex-col gap-2 md:gap-4 border border-slate-300 rounded-xl shadow-md p-4 md:p-8 bg-white">
            <div className="text-center flex flex-col items-center">
              <HeHeading1 title={"Welcome back!"} />
              <HeInfoText
                message={
                  "Sign in to start using the app and take clinical encounters effortlessly."
                }
                className={"text-xs md:text-sm mt-2 md:mt-4"}
              />
            </div>
            <div className="flex flex-col gap-2 md:gap-4 mt-5">
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
          </div>

          <div className="flex self-center mt-8 md:mt-16 gap-2 items-center">
            <HeBack navigateTo={"/welcome"} />
            <HeFormSubmitButton
              title={"Continue"}
              className={"w-fit self-center"}
              icon={<FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />}
            />
          </div>
        </form>
      </Form>
    </section>
  );
};

export default SignIn;
