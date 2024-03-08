/* globals zoomSdk */
/** library imports */
import { useEffect, useState, useCallback } from "react";
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
  ViewPastSessionDetails,
  ConsultationNotes,
} from "./routesModule/main";

/** shadcn imports */
import { Toaster } from "sonner";
import { apis } from "./apis";

const App = () => {
  const { staticData, labelData } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  // const history = useHistory();
  // const location = useLocation();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [runningContext, setRunningContext] = useState(null);
  const [connected, setConnected] = useState(false);
  const [counter, setCounter] = useState(0);
  const [preMeeting, setPreMeeting] = useState(true); // start with pre-meeting code
  const [userContextStatus, setUserContextStatus] = useState("");
  const [data, setData] = useState("");
  useEffect(() => {
    async function configureSdk() {
      // to account for the 2 hour timeout for config
      const configTimer = setTimeout(() => {
        setCounter(counter + 1);
      }, 120 * 60 * 1000);

      try {
        // Configure the JS SDK, required to call JS APIs in the Zoom App
        // These items must be selected in the Features -> Zoom App SDK -> Add APIs tool in Marketplace
        const configResponse = await zoomSdk.config({
          capabilities: [
            // apis demoed in the buttons
            ...apis.map((api) => api.name), // IMPORTANT

            // demo events
            "onSendAppInvitation",
            "onShareApp",
            "onActiveSpeakerChange",
            "onMeeting",
            "cloudRecording",
            // connect api and event
            "connect",
            "onConnect",
            "postMessage",
            "onMessage",

            // in-client api and event
            "authorize",
            "onAuthorized",
            "promptAuthorize",
            "getUserContext",
            "onMyUserContextChange",
            "sendAppInvitationToAllParticipants",
            "sendAppInvitation",
          ],
          version: "0.16.0",
        });
        console.log("App configured", configResponse);
        // The config method returns the running context of the Zoom App
        setRunningContext(configResponse.runningContext);
        setUserContextStatus(configResponse.auth.status);
        zoomSdk.onSendAppInvitation((data) => {
          console.log(data);
        });
        zoomSdk.onShareApp((data) => {
          console.log(data);
        });
      } catch (error) {
        console.log(error);
        setError("There was an error configuring the JS SDK");
      }
      return () => {
        clearTimeout(configTimer);
      };
    }
    configureSdk();
  }, [counter]);

  // PRE-MEETING
  let on_message_handler_client = useCallback(
    (message) => {
      let content = message.payload.payload;
      if (content === "connected" && preMeeting === true) {
        console.log("Meeting instance exists.");
        zoomSdk.removeEventListener("onMessage", on_message_handler_client);
        console.log("Letting meeting instance know client's current state.");
        sendMessage(window.location.hash, "client");
        setPreMeeting(false); // client instance is finished with pre-meeting
      }
    },
    [preMeeting]
  );

  // PRE-MEETING
  useEffect(() => {
    if (runningContext === "inMainClient" && preMeeting === true) {
      zoomSdk.addEventListener("onMessage", on_message_handler_client);
    }
  }, [on_message_handler_client, preMeeting, runningContext]);

  async function sendMessage(msg, sender) {
    console.log(
      "Message sent from " + sender + " with data: " + JSON.stringify(msg)
    );
    console.log("Calling postmessage...", msg);
    await zoomSdk.postMessage({
      payload: msg,
    });
  }

  useEffect(() => {
    async function connectInstances() {
      // only can call connect when in-meeting
      if (runningContext === "inMeeting") {
        zoomSdk.addEventListener("onConnect", (event) => {
          console.log("Connected");
          setConnected(true);

          // PRE-MEETING
          // first message to send after connecting instances is for the meeting
          // instance to catch up with the client instance
          if (preMeeting === true) {
            console.log("Letting client know meeting instance exists.");
            sendMessage("connected", "meeting");
            console.log("Adding message listener for client's current state.");
            let on_message_handler_mtg = (message) => {
              console.log(
                "Message from client received. Meeting instance updating its state:",
                message.payload.payload
              );
              window.location.replace(message.payload.payload);
              zoomSdk.removeEventListener("onMessage", on_message_handler_mtg);
              setPreMeeting(false); // meeting instance is finished with pre-meeting
            };
            zoomSdk.addEventListener("onMessage", on_message_handler_mtg);
          }
        });

        await zoomSdk.connect();
        console.log("Connecting...");
      }
    }

    if (connected === false) {
      connectInstances();
    }
  }, [connected, "", preMeeting, runningContext]);

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
          <Route
            path="/welcome"
            element={
              <Welcome
                handleError={setError}
                handleUserContextStatus={setUserContextStatus}
                handleUser={setUser}
                user={user}
                userContextStatus={userContextStatus}
                setData={setData}
                data={data}
              />
            }
          />
          <Route path="/sign-in" element={<SignIn data={data} />} />
          <Route path="/code-sent" element={<CodeSent />} />
          <Route
            path="/start-new-consultation"
            element={<StartNewConsultation />}
          />
          <Route path="/consultation-screen" element={<ConsultationScreen />} />
          <Route path="/review-consultation-notes" element={<ReviewNotes />} />
          <Route path="/consultation-notes" element={<ConsultationNotes />} />
          <Route
            path="/history/conversation/:id"
            element={<ViewPastSessionDetails />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />
    </div>
  );
};

export default App;
