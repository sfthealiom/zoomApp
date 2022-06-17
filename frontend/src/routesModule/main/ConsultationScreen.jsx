/** library imports */
import React, { useEffect, useState } from "react";
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
import PasswordStrengthBar from "react-password-strength-bar";

/** custom imports */
import { LoaderSpin } from "../../components/helpers";
import {
  getLabels,
  phoneRegex,
  hasUpperCase,
  hasLowerCase,
  atleastOneNumber,
  atleastOneSpecialChar,
  setToSessionStore,
} from "../../reduxFolder/CommonFunctions";
import {
  HeFormSubmitButton,
  HeHeading1,
  HeHeading2,
  HeInfoText,
  HePhoneNumber,
  HeTextInput,
} from "../../heCustomComponents";
import { Diagnosis, Objective, Subjective } from "./consultationSections";

/** shadcn imports */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { toast } from "sonner";

/** redux imports */
import { useDispatch, useSelector } from "react-redux";
// import {
//   checkUserExists,
//   setPassword,
// } from "@/reduxFolder/actions/AuthActions";
import { companyMetaData } from "../../assets/myCompanyData";
import { Separator } from "../../components/ui/Separator";

const ConsultationScreen = () => {
  const dispatch = useDispatch();
  const { loader, labelData, appLanguage } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const FormSchema = z
    .object({
      first_name: z.string().min(3, "Minimum 3 characters are required"),
      last_name: z.string().min(3, "Minimum 3 characters are required"),
      email: z.string().email("Invalid Email"),
      dialCode: z.string().min(1, "Required"),
      mobile: z.string().regex(phoneRegex, "Invalid Phone Number"),
      npi: z.string(),
      password: z.string().min(8, "Required"),
      confirmPassword: z.string().min(8, "Required"),
      check1: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check2: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check3: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
      check4: z.literal(true, {
        errorMap: () => ({ message: "Required" }),
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords did not match!",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm({
    mode: "all",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "John",
      last_name: "Doe",
      dialCode: "+1",
      mobile: "333-444-5555",
      email: "john@doe.com",
      npi: "1020283787",
      password: "!helloWorld9",
      confirmPassword: "!helloWorld9",
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    },
  });

  useEffect(() => {
    setToSessionStore({
      key: "lastPage",
      value: "/consultation-screen",
    });
  }, []);

  const handleAccountCreation = (data, e) => {
    e.preventDefault();
    navigate("/code-sent");
    toast.success("Code sent!");
  };

  return loader ? (
    <LoaderSpin />
  ) : (
    <section className="w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAccountCreation)}
          className="w-full max-w-xs md:max-w-2xl items-center flex flex-col gap-6 md:gap-8 justify-between h-full md:p-4"
        >
          <div className="w-full flex flex-col gap-2 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
            <HeHeading2 title={"Note Builder"} className={`md:text-[18px]`} />
            <div
              className="rounded-md"
              style={{ backgroundColor: companyMetaData?.primaryLightest }}
            >
              <p className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                facilis temporibus corrupti est neque veritatis dicta sapiente,
                ad esse. Dicta voluptatem fugiat architecto impedit in
                reiciendis libero ratione dolorem perferendis soluta debitis, ad
                voluptatibus, illum corporis quisquam quis itaque rerum neque,
                consequatur fuga. Dolor asperiores, delectus expedita quam ipsa
                non ea obcaecati vel fugit quibusdam iure ratione hic dolores
                quidem minima molestias sit exercitationem soluta. Aliquam esse
                fugiat voluptate unde sapiente adipisci voluptatibus earum.
                Ullam, officia illo reiciendis eaque iusto doloribus eum ea
                expedita veniam sint molestias quaerat ad quibusdam. Nisi
                praesentium fuga repudiandae dignissimos pariatur laboriosam
                dicta ut enim?
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 rounded-xl shadow-md px-4 py-3 md:px-5 md:py-4 bg-white">
            <Subjective />
            <Objective />
            <Diagnosis />
          </div>
          <div className="flex self-center mt-8 md:mt-16 gap-2 items-center">
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

export default ConsultationScreen;
