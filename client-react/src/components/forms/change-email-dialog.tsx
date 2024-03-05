import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChangeEmailDialog: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <Input type="email" placeholder="New Email" />
        <DialogFooter>
          <Button type="submit" className="w-full">
            Update Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
