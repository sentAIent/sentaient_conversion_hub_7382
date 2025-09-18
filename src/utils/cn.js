import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ScrollToTop from './components/ScrollToTop';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}