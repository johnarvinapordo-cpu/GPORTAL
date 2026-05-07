import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (primary version using clsx + tailwind-merge)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date into readable string (e.g. January 1, 2026)
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Simple className helper (fallback version)
 * NOTE: kept but renamed to avoid duplicate export error
 */
export function cnBasic(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format number into Philippine Peso currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

/**
 * Calculate GPA from midterm and finals grades
 */
export function calculateGPA(
  grades: { midterm: number; finals: number }[]
): number {
  if (grades.length === 0) return 0;

  const total = grades.reduce((acc, grade) => {
    return acc + (grade.midterm + grade.finals) / 2;
  }, 0);

  return Math.round((total / grades.length) * 100) / 100;
}