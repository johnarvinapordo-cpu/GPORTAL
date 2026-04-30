import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount)
}

export function calculateGPA(grades: { midterm: number; finals: number }[]): number {
  if (grades.length === 0) return 0
  const total = grades.reduce((acc, grade) => {
    return acc + (grade.midterm + grade.finals) / 2
  }, 0)
  return Math.round((total / grades.length) * 100) / 100
}
