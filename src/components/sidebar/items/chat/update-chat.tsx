import { FC, useRef, useState } from "react";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface UpdateChatProps {
  open: boolean;
  title: string;
  dialogTitle: string;
  onOpenChange: (open: boolean) => void;
  onCancelUpdateChat: () => void;
  onUpdateChat: (name: string) => void;
}

export const UpdateChat: FC<UpdateChatProps> = ({
  open,
  title,
  dialogTitle,
  onOpenChange,
  onCancelUpdateChat,
  onUpdateChat,
}) => {
  // ref
  const buttonRef = useRef<HTMLButtonElement>(null);

  // state
  const [name, setName] = useState<string>(title || "");

  // function
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
        </DialogHeader>

        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancelUpdateChat}>
            Cancel
          </Button>
          <Button ref={buttonRef} onClick={() => onUpdateChat(name)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
