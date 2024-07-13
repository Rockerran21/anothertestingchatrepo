import { FC, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

interface LogoutModalProps {
  open: boolean;
  dialogTitle: string;
  onOpenChange: (open: boolean) => void;
  onCancel: () => void;
  onLogout: () => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({
  open,
  dialogTitle,
  onOpenChange,
  onCancel,
  onLogout,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      buttonRef.current?.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>

          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button ref={buttonRef} variant="destructive" onClick={onLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
