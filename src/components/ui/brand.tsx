"use client";

import { FC } from "react";

interface BrandProps {
  theme?: "dark" | "light";
}

export const Brand: FC<BrandProps> = ({ theme = "dark" }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center">
      <div className="mb-2">Logo</div>
      <div className="text-4xl font-bold tracking-wide">RH GPT</div>
    </div>
  );
};
