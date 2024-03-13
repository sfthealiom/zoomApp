/** library imports */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/** custom import */
import { companyMetaData } from "../assets/myCompanyData";

/** shadcn imports */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/Dialog";
import { Button } from "../components/ui/Button";

const DeleteUIDData = ({ cancelText, confirmText, onPress }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FontAwesomeIcon
          icon={faXmark}
          className="h-4 w-4 mr-2 rounded-full cursor-pointer text-slate-400"
        />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] md:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription>This action cannot be reverted.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-2 justify-center">
            <DialogClose asChild>
              <Button
                style={{ backgroundColor: companyMetaData?.accentDelete }}
                className="w-1/2"
              >
                {cancelText}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                style={{
                  backgroundColor: companyMetaData?.accentOne,
                }}
                className="w-1/2"
                onClick={() => {}}
              >
                {confirmText}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUIDData;
