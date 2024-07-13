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

interface DeleteChatProps {
  open: boolean;
  dialogTitle: string;
  onOpenChange: (open: boolean) => void;
  onCancelChat: () => void;
  onDeleteChat: () => void;
}

export const DeleteChat: FC<DeleteChatProps> = ({
  open,
  dialogTitle,
  onOpenChange,
  onCancelChat,
  onDeleteChat,
}) => {
  // ref
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
            Are you sure you want to delete?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancelChat}>
            Cancel
          </Button>
          <Button ref={buttonRef} variant="destructive" onClick={onDeleteChat}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
