import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, parseISO } from "date-fns";

type Item = {
  id: string;
  name: string;
  updated_at: string; // ISO date string
};

type Folder = {
  id: string;
  name: string;
  items: Item[];
};

type GroupedItems = {
  [key: string]: Item[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupItemsByDate = (items: Item[]): GroupedItems => {
  const groups = items.reduce((acc: GroupedItems, item: Item) => {
    const date = parseISO(item.updated_at);
    let groupKey: string;

    if (isToday(date)) {
      groupKey = "Today";
    } else if (isYesterday(date)) {
      groupKey = "Yesterday";
    } else {
      groupKey = format(date, "yyyy-MM-dd");
    }

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  return groups;
};

// context presists
const PERSISTENCE_KEY = "chatbotUIState";
interface PersistableState {
  [key: string]: any;
}

export const saveState = (
  state: any,
  whitelist: string[],
  blacklist: string[],
) => {
  const stateToPersist = Object.keys(state)
    .filter((key) => whitelist.includes(key) && !blacklist.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: state[key] }), {});
  localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(stateToPersist));
};

export const loadState = (): PersistableState | null => {
  const savedState = localStorage.getItem(PERSISTENCE_KEY);
  return savedState ? JSON.parse(savedState) : null;
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};
