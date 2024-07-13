import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  type UIEventHandler,
} from "react";

import { ChatbotUIContext } from "@/context/context";

export const useScroll = () => {
  const { isGenerating, chatMessagesList } = useContext(ChatbotUIContext);

  const messagesStartRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef(false);

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (isGenerating && !userScrolled) {
      scrollToBottom();
    }
  }, [chatMessagesList]);

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback((e) => {
    const target = e.target as HTMLDivElement;

    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;

    // Use a small tolerance range to check if at the bottom
    const tolerance = 5;
    const bottom =
      Math.abs(scrollHeight - scrollTop - clientHeight) <= tolerance;

    setIsAtBottom(bottom);

    const top = target.scrollTop === 0;
    setIsAtTop(top);

    if (!bottom && !isAutoScrolling.current) {
      setUserScrolled(true);
    } else {
      setUserScrolled(false);
    }

    const isOverflow = target.scrollHeight > target.clientHeight;
    setIsOverflowing(isOverflow);
  }, []);

  const scrollToTop = useCallback(() => {
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    isAutoScrolling.current = true;

    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "instant" });
      }

      setIsAtBottom(true);
      isAutoScrolling.current = false;
    }, 100);
  }, []);

  return {
    messagesStartRef,
    messagesEndRef,
    isAtTop,
    isAtBottom,
    userScrolled,
    isOverflowing,
    handleScroll,
    scrollToTop,
    scrollToBottom,
    setIsAtBottom,
  };
};
