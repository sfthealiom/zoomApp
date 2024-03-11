import moment from "moment";

/** regex patterns */
export const tenDigitRegex = /^\d{10}$/;
export const tinRegex = /^\d{3}\-\d{3}-\d{3}$/;
export const urlRegex =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/;
export const passswordRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
export const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
export const editPhoneRegex = /^\+(\d{1}\-)?(\d{1,3})\s\d{10}$/;
export const phoneRegex = /^\d{3}\-\d{3}-\d{4}$/;

/** password validations */
export const hasUpperCase = (str) => /[A-Z]/.test(str);
export const hasLowerCase = (str) => /[a-z]/.test(str);
export const atleastOneNumber = (str) => /\d/.test(str);
export const atleastOneSpecialChar = (str) => {
  const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return specialCharacterRegex.test(str);
};

/** is object empty */
export const isObjectEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};

/** is valid url */
export const isValidURL = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};

/** check card type */
export const checkCardType = (digits) => {
  const cardTypes = [
    { type: "visa", pattern: /^4/ },
    { type: "mastercard", pattern: /^5[1-5]/ },
    { type: "american_express", pattern: /^3[47]/ },
    { type: "discover", pattern: /^6(?:011|5)/ },
    // Add more card types and their patterns as needed
  ];

  const matchedCard = cardTypes.find((card) => card.pattern.test(digits));
  if (!matchedCard) {
    return { cardType: "Unknown" }; // Card type not recognized
  }
  return matchedCard.type;
};

/** check if valid credit card exp date or not */
/** str: MM/YY */
export const checkIfValidExpDate = (str) => {
  const [month, year] = str?.split("/");
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = Number(String(new Date().getFullYear()).slice(-2));
  if (currentYear < Number(year)) {
    return true;
  } else if (currentYear === Number(year)) {
    return Number(month) > currentMonth ? true : false;
  } else {
    return false;
  }
};

/** check if valid start date or not */
/** str: DD/MM/YYYY */
export const checkIfFutureDate = (str) => {
  const [month, date, year] = str?.split("/");
  const givenData = new Date(`${year}-${month}-${date}`);
  const now = new Date();
  if (givenData > now) {
    return true;
  } else {
    return false;
  }
};

/** setItem to sessionStorage */
export const setToSessionStore = ({ key, value }) => {
  window.sessionStorage.setItem(key, value);
};

/** get labels data */
export const getData = (obj, key, def) => {
  if (obj) {
    if (!obj.hasOwnProperty(key)) {
      return def;
    }
    return obj[key];
  } else {
    return def;
  }
};

/** get labels */
export const getLabels = (key, language, data) => {
  const tempObj = getData(data, key, {});
  const message = getData(tempObj, language, getData(tempObj, "en", ""));
  return message;
};

/** convert inch to cms */
export const inchToCms = (feet, inch) => {
  return (feet * 12 * 2.54 + inch * 2.54).toFixed(1);
};

/** convert cms to inch */
export const cmsToInch = (cms) => {
  return cms / 2.54;
};

/** previous years from back */
export const allPreviousYears = (back) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => year - back + i + 1);
};

/** all months object */
export const allMonths = moment.months().map((month) => {
  return { id: month, item: month };
});

/** severity json */
export const severityArray = [
  { id: "Mild", item: "Mild" },
  { id: "Moderate", item: "Moderate" },
  { id: "Severe", item: "Severe" },
];

/** active inactive json */
export const activeInactiveArray = [
  { id: "Active", item: "Active" },
  { id: "Inactive", item: "Inactive" },
];

/** dosage json */
export const dosageJSON = Array.from(Array(21).keys()).map((val) => {
  return {
    id: val?.toString(),
    item: val?.toString(),
  };
});

/** filter out JSON */
export const filterJSON = (jsonData, excludeKeys) => {
  const filteredData = {};
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key) && !excludeKeys.includes(key)) {
      filteredData[key] = jsonData[key];
    }
  }
  return filteredData;
};

export const convertEpochToLocal = (ids) => {
  return ids.map((id) => {
    // Splitting each ID and extracting the epoch time
    const parts = id.split("__");
    const epochTime = parseInt(parts[2], 10); // Convert string to integer

    // Creating a new Date object for the epoch time and converting to local time string
    const date = new Date(epochTime);
    const localTimestamp = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"); // Converts to local time string

    // Returning the formatted object
    return {
      name: id,
      timestamp: localTimestamp,
    };
  });
};

export const dispensedUnitData = [
  {
    item: "Applicator",
    id: "Applicator",
  },
  {
    item: "Caplet",
    id: "Caplet",
  },
  {
    item: "Each",
    id: "Each",
  },
  {
    item: "Gram",
    id: "Gram",
  },
  {
    item: "Implant",
    id: "Implant",
  },
  {
    item: "Kit",
    id: "Kit",
  },
  {
    item: "Lozenge",
    id: "Lozenge",
  },
  {
    item: "Packet",
    id: "Packet",
  },
  {
    item: "Patch",
    id: "Patch",
  },
  {
    item: "Ring",
    id: "Ring",
  },
  {
    item: "Stick",
    id: "Stick",
  },
  {
    item: "Suppository",
    id: "Suppository",
  },
  {
    item: "Tablet",
    id: "Tablet",
  },
  {
    item: "Unspecified",
    id: "Unspecified",
  },
  {
    item: "Blister",
    id: "Blister",
  },
  {
    item: "Capsule",
    id: "Capsule",
  },
  {
    item: "Film",
    id: "Film",
  },
  {
    item: "Gum",
    id: "Gum",
  },
  {
    item: "Insert",
    id: "Insert",
  },
  {
    item: "Lancet",
    id: "Lancet",
  },
  {
    item: "Milliliter",
    id: "Milliliter",
  },
  {
    item: "Pad",
    id: "Pad",
  },
  {
    item: "Pen Needle",
    id: "Pen Needle",
  },
  {
    item: "Sponge",
    id: "Sponge",
  },
  {
    item: "Strip",
    id: "Strip",
  },
  {
    item: "Swab",
    id: "Swab",
  },
  {
    item: "Troche",
    id: "Troche",
  },
  {
    item: "Wafer",
    id: "Wafer",
  },
];

export const route_static_data = [
  {
    id: "Intravenous (IV)",
    item: "Intravenous (IV)",
  },
  { id: "Intramuscular (IM)", item: "Intramuscular (IM)" },
  { id: "Inhalation", item: "Inhalation" },
  { id: "Oral", item: "Oral" },
  { id: "Rectal", item: "Rectal" },
  { id: "Intraosseus (IO)", item: "Intraosseus (IO)" },
];
