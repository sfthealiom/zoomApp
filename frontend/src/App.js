/** library imports */
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isObjectEmpty } from "./reduxFolder/CommonFunctions";
import { companyMetaData } from "./assets/myCompanyData";

/** common routes */
import { Splash, NotFound, ProtectedLayout } from "./routesModule/common";

/** auth routes */
import { SignIn, Welcome, CodeSent } from "./routesModule/auth";

/** main routes */
import {
  StartNewConsultation,
  ConsultationScreen,
  ReviewNotes,
} from "./routesModule/main";

/** shadcn imports */
import { Toaster } from "sonner";

const App = () => {
  const { staticData, labelData } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isObjectEmpty(staticData) || isObjectEmpty(labelData)) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="font-light"
      style={{
        backgroundColor: companyMetaData.bgColor,
        color: companyMetaData.textColor,
      }}
    >
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/code-sent" element={<CodeSent />} />
          <Route
            path="/start-new-consultation"
            element={<StartNewConsultation />}
          />
          <Route path="/consultation-screen" element={<ConsultationScreen />} />
          <Route path="/review-consultation-notes" element={<ReviewNotes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />
    </div>
  );
};

export default App;
