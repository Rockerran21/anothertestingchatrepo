import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowUp } from "@tabler/icons-react";

import { cn, generateUniqueId } from "@/lib/utils";
import { WithTooltip } from "../ui/with-tooltip";
import { TextareaAutosize } from "../ui/textarea-autosize";

interface ChatInputProps {}

const cards = [
  {
    title: "Drafting Communications",
    description:
      "I am a [role]. Write an email to [person] that is friendly yet professional. The email context is [context]. The format should include [required sections].",
  },
  {
    title: "Brainstorm Ideas",
    description:
      "I need help to brainstorm some new ideas for [context]. The format for this should include [format requirements]. Please provide [number] ideas.",
  },
  {
    title: "Technology",
    description:
      "Acting as a technology instructor, explain what this code does [insert code].  Begin with the code language followed by a detailed step-by-step explanation.",
  },
  {
    title: "Planning Milestones",
    description:
      "I am a [Project Manager/ScrumMaster/Scheduler] tasked with creating a roadmap.  Provide an example overview of the key milestones with target dates in a table format.  The project information includes [project details] and begins on [start date].",
  },
  {
    title: "Agenda-Summary",
    description:
      "Create a meeting agenda and summary template.  The topics include [meeting topics] and the meeting is scheduled for [time start to time end].  The summary should include a table with action items, assigned to and due date.",
  },
  {
    title: "Summarize",
    description:
      "Summarize the following content [paste article or email/process]",
  },
];

export const ChatInput: FC<ChatInputProps> = () => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (title: string, description: string) => {
    setInputValue(description);
    setSelectedCard(title);
  };

  const handleSendClick = () => {
    if (selectedCard) {
      setSelectedCard(null);
    }

    if (inputValue.trim() === "") {
      return;
    }

    const uniqueId = generateUniqueId();
    localStorage.setItem(`chat-${uniqueId}`, inputValue);
    setInputValue("");
    router.push(`/chat/${uniqueId}`);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`border-primary flex flex-col justify-between rounded-lg border p-2 group ${
              selectedCard === card.title
                ? "bg-selected text-selected-foreground"
                : ""
            }`}
            onClick={() => handleCardClick(card.title, card.description)}
          >
            <div className="flex justify-between items-start space-y-1">
              <div className="flex flex-col">
                <div className="truncate text-sm font-bold">{card.title}</div>
                <div className="font-normal opacity-70 text-sm overflow-hidden text-ellipsis">
                  {card.description}
                </div>
              </div>
              <WithTooltip
                delayDuration={0}
                display={<div>Click to edit</div>}
                trigger={
                  <IconArrowUp
                    size={24}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-input relative mt-8 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2">
        <TextareaAutosize
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-6 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Message RH GPT"
          minRows={1}
          maxRows={8}
          value={inputValue}
          onValueChange={setInputValue}
        />

        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
          <IconArrowUp
            size={30}
            stroke={2}
            className={cn("bg-primary text-secondary rounded-full p-1")}
            onClick={handleSendClick}
          />
        </div>
      </div>
    </>
  );
};
