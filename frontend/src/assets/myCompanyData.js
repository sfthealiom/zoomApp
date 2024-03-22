import axios from "axios";
// import { company } from "@/env";
import { configSecret } from "./awsSecrets";

const { API_URL } = configSecret;

/** get compnay json for white labelling */
export const getCompanyJSON = async (company) => {
  const config = {
    method: "get",
    url: API_URL + `/get_org_value?organization_name=${company}`,
    maxBodyLength: Infinity,
    headers: {},
  };
  const companyData = axios(config).then((res) => {
    return res?.data?.items;
  });
  return companyData;
};

let companyMetaData = {
  companyName: "Healiom",
  organizationId: "776e17a2-f7cb-45b0-a52a-630e57c7227e",
  companyLogoUrl:
    "https://s3.us-east-2.amazonaws.com/healiomserver/org/healiom/logo.jpeg",
  accentOne: "#00B1ED",
  accentOneLight: "#EBFAFF",
  accentTwo: "#21B89D",
  accentTwoLight: "#EBFAF8",
  accentThree: "#8b6914",
  accentThreeLight: "#fff8dc",
  accentDelete: "#ef3848",
  accentDisabled: "#21B89A",
  accentSlate: "#94b8a3",
  accentBlack: "#000000",
  accentBlackLight: "#808080",
  accentWhite: "#FFFFFF",
  accentGray: "#F8F9F9",
  bgColor: "#FFFFFF",
  bgNavbarColor: "#FFFFFF",
  bgBodyColor: "#cdffcd",
  textColor: "#000000",
  primary: "#1FC8FF",
  primaryLight: "#AFEBFF",
  primaryLightest: "#EBFAFF",
  secondary: "#00ACF5",
  aiLight: "#FBF6FF",
  aiDark: "#AF5FFF",
  aiDeselect: "#C99DFF",
};

// companyMetaData = await getCompanyJSON(company);

export { companyMetaData };
