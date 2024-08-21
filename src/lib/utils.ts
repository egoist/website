import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const sortByDate = <
  T extends {
    data: { pubDate?: Date; date?: Date; [k: string]: any }
    [k: string]: any
  },
>(
  items: T[],
): T[] => {
  return items.sort((a, b) => {
    if (!a.data.date || !b.data.date) return 0

    return a.data.date.getTime() > b.data.date.getTime() ? -1 : 1
  })
}

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}
