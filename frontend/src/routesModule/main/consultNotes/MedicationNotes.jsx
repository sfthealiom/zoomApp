/** library imports */
import React from "react";

/** custom imports */
import { HeCopy, HeHeading2 } from "../../../heCustomComponents";
import { companyMetaData } from "../../../assets/myCompanyData";

/** shadcn import */
import { cn } from "../../../components/lib/utils";

/** redux imports */

const MedicationNotes = ({ medications }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <HeHeading2 title={"Medication Orders"} className={`md:text-[18px]`} />
        <HeCopy
          targetText={JSON.stringify(medications)}
          targetId={"medications"}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        {medications?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {medications?.map((item, index) => {
              return <MedRecord data={item} key={index} />;
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No medications added.</p>
        )}
      </div>
    </div>
  );
};

const MedRecord = ({ data }) => {
  return (
    <div
      className="px-4 py-3 flex flex-col gap-2 rounded-md"
      style={{
        backgroundColor: companyMetaData?.accentGray,
      }}
    >
      <div className="flex items-start gap-1 justify-between">
        <h1 className="max-w-xs font-semibold">{data?.code_value}</h1>
        <p>{data?.code}</p>
      </div>
      <div className="grid grid-cols-3 items-start gap-2">
        <CardPill
          title={"Quantity"}
          value={data?.quantity}
          className={"w-full md:w-1/3"}
        />
        <CardPill
          title={"Refills"}
          value={data?.refills}
          className={"w-full md:w-1/3"}
        />
        <CardPill title={"Days Supply"} value={data?.daySupply} />
      </div>
      <div className="grid grid-cols-3 items-start gap-2">
        <CardPill
          title={"Form"}
          value={data?.form_way}
          className={"w-full md:w-1/3"}
        />
        <CardPill
          title={"Route"}
          value={data?.route}
          className={"w-full md:w-1/3"}
        />
        <CardPill
          title={"Directions"}
          value={data?.directions}
          className={"w-full md:w-1/3"}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-2">
        <CardPill
          title={"Allow substitutions?"}
          className={"w-full md:w-1/2"}
          value={data?.allowSub}
        />
        <CardPill
          title={"Fulfill in-clinic?"}
          className={"w-full md:w-1/2"}
          value={data?.inClinic}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <CardPill
          title={"Pharmacy Notes"}
          className={"w-full md:w-1/2"}
          value={data?.pharmacyNotes}
        />
        <CardPill
          title={"Order/Reason"}
          className={"w-full md:w-1/2"}
          value={data?.orderReason}
        />
      </div>
    </div>
  );
};

const CardPill = ({ title, value, className }) => {
  return (
    <div className={cn(`flex flex-col ${className}`, {})}>
      <h1 className="font-semibold text-slate-500 text-sm">{title}</h1>
      <h2 className="text-slate-700">{value}</h2>
    </div>
  );
};

export default MedicationNotes;
