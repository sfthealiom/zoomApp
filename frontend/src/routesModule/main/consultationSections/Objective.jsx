/** library imports */
import React from "react";

/** custom imports */
import { companyMetaData } from "../../../assets/myCompanyData";
import { HeHeading2 } from "../../../heCustomComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Objective = () => {
  const data =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis expedita assumenda accusamus vitae est voluptatibus! Quasi deserunt inventore et cumque nesciunt illo repellat neque doloremque? Adipisci fuga, harum distinctio possimus delectus autem eligendi libero vero nisi iure quisquam suscipit quis quidem laborum quibusdam molestias aliquam saepe! Excepturi enim facere possimus Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis expedita assumenda accusamus vitae est voluptatibus! Quasi deserunt inventore et cumque nesciunt illo repellat neque doloremque? Adipisci fuga, harum distinctio possimus delectus autem eligendi libero vero nisi iure quisquam suscipit quis quidem laborum quibusdam molestias aliquam saepe! Excepturi enim facere possimus Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis expedita assumenda accusamus vitae est voluptatibus! Quasi deserunt inventore et cumque nesciunt illo repellat neque doloremque? Adipisci fuga, harum distinctio possimus delectus autem eligendi libero vero nisi iure quisquam suscipit quis quidem laborum quibusdam molestias aliquam saepe! Excepturi enim facere possimus";

  return (
    <div className="w-full flex flex-col gap-2">
      <HeHeading2 title={"Objective Summary"} className={`md:text-[18px]`} />
      <div
        className="rounded-md"
        style={{
          backgroundColor: companyMetaData?.aiLight,
          color: companyMetaData?.aiDark,
        }}
      >
        {data?.length > 0 ? (
          <p
            className="h-[200px] overflow-y-scroll text-slate-600 scrollbar text-justify px-4 py-3"
            style={{
              color: companyMetaData?.aiDark,
            }}
          >
            {data}
          </p>
        ) : (
          <div className="flex items-center">
            <span>Preparing Summary</span>
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="h-4 w-4 ml-2 animate-spin"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Objective;
