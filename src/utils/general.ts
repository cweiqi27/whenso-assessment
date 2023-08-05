import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Merge tailwind classes safely.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
